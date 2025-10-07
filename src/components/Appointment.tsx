'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AppointmentData, getAppointmentData, postAppointment } from '@/data/AppointmentData';

const TREATMENTS = [
  { id: '607b4f522bb5b518589e4d1e', title: 'Massage' },
  { id: '607b429f2bb5b518589e4d17', title: 'Cellulite Reduction' },
  { id: '607b4d342bb5b518589e4d1a', title: 'Facial' },
  { id: '607b4e662bb5b518589e4d1d', title: 'Waxing' },
  { id: '607b4e102bb5b518589e4d1c', title: 'Laser Hair Removal' },
];


// funktion der viser år måned dag
const formatDate = (date: Date) => date.toISOString().split('T')[0];
const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};


//appointment data henter tider af apointment der er booket
//formdata er den der holder fomularen 
const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatment: '',
    date: '',
    time: '',
    notes: '',
  });


  // gør så du kum kan bugge en tid fra dagen og 6 mpåneder frem
  const today = new Date();
  const maxDate = addMonths(today, 6);
  const minDateStr = formatDate(today);
  const maxDateStr = formatDate(maxDate);

  //henter eksisterende bookinger
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAppointmentData();
      setAppointments(data);
    };

    fetchData();
  }, []);

  //finder bookede tider for den valgte dato og deaktivere dem i dropdown
  const bookedTimesForDate = appointments
    .filter((a) => formatDate(new Date(a.dateandtime)) === formData.date)
    .map((a) => new Date(a.dateandtime).toTimeString().substring(0, 5));

  //mulige tider der kan bookes
  const possibleTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

  // når du skriver i input felterne opdatere formdata
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // stopper browsern i at reloade
  //tjekker om alle felter er udfyldt
  // laver dato og tid om til iso string
  // sender data til backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, treatment, date, time, notes } = formData;

    if (!name || !email || !phone || !treatment || !date || !time) {
      alert('Udfyld alle påkrævede felter.');
      return;
    }

    const isoDateTime = new Date(`${date}T${time}`);

    if (isNaN(isoDateTime.getTime())) {
      alert('Ugyldig dato eller tid.');
      return;
    }

    try {
      await postAppointment({
        name,
        email,
        phone,
        treatment,
        // dateandtime: isoDateTime.toISOString(),
        dateandtime: '2025-09-17T06:00:00.000Z',
        notes,
      });
      alert('Tak for din booking! Du modtager en bekræftelse på e-mail.');
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-pink-50">
      <section>
        <Image
          src="/img/appointment-img.jpg"
          alt="appointment"
          width={500}
          height={500}
          className="w-full h-auto object-cover"
        />
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 uppercase p-6">
        <div className='flex w-full gap-2'>
          <input name="name" type="text" placeholder="name" className="p-2 border-b  w-1/2" onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" className="p-2 border-b  w-1/2" onChange={handleChange} />
        </div>

        <div className='flex w-full gap-2'>
          <select name="treatment" className="p-2 border-b w-1/2" onChange={handleChange}>
            <option value="">select service</option>
            {TREATMENTS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>
          <input name="phone" type="tel" placeholder="phone number" className="p-2 border-b  w-1/2" onChange={handleChange} />
        </div>

        <input
          name="date"
          type="date"
          min={minDateStr}
          max={maxDateStr}
          className="p-2 border-b "
          value={formData.date}
          onChange={handleChange}
        />

        <select name="time" value={formData.time} onChange={handleChange} className="p-2 border-b-2">
          <option value="">-:-</option>
          {possibleTimes.map((time) => (
            <option key={time} value={time} disabled={bookedTimesForDate.includes(time)}>
              {time} {bookedTimesForDate.includes(time) ? ' (Optaget)' : ''}
            </option>
          ))}
        </select>

        <textarea
          name="notes"
          placeholder="your notes"
          className="p-2 border-b h-20"
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="bg-red-400 text-white py-2 px-4 mt-4 rounded-full hover:bg-red-300 cursor-pointer inline-block">
          make an appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
