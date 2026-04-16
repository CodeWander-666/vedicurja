'use client';
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import MeetingRoom from '@/components/sections/dashboard/MeetingRoom';

interface AvailabilitySlot {
  id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Consultation {
  id: string;
  client_id: string;
  scheduled_at: string;
  status: string;
  meeting_url: string | null;
  payment_status: string;
}

export function ConsultationsManager() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot | null>(null);
  const [showMeeting, setShowMeeting] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel('admin-consult')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultation_availability' }, fetchData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'consultations' }, fetchData)
      .subscribe();
    return () => { channel.unsubscribe(); };
  }, []);

  const fetchData = async () => {
    const [slotsRes, consultsRes] = await Promise.all([
      supabase.from('consultation_availability').select('*').order('start_time'),
      supabase.from('consultations').select('*').order('scheduled_at', { ascending: false }),
    ]);
    setSlots(slotsRes.data || []);
    setConsultations(consultsRes.data || []);
    setLoading(false);
  };

  const handleEventClick = (info: any) => {
    const slot = info.event.extendedProps.slot;
    setSelectedSlot(slot);
  };

  const handleDeleteSlot = async () => {
    if (!selectedSlot) return;
    await supabase.from('consultation_availability').delete().eq('id', selectedSlot.id);
    setSelectedSlot(null);
  };

  const handleAddSlot = async (start: string, end: string) => {
    await supabase.from('consultation_availability').insert({ start_time: start, end_time: end });
  };

  const handleJoinMeeting = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setShowMeeting(true);
  };

  const events = slots.map(slot => ({
    id: slot.id,
    title: slot.is_booked ? 'Booked' : 'Available',
    start: slot.start_time,
    end: slot.end_time,
    backgroundColor: slot.is_booked ? '#ef4444' : '#10b981',
    borderColor: slot.is_booked ? '#ef4444' : '#10b981',
    extendedProps: { slot },
  }));

  if (loading) return <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-8">
      {/* Slot Management */}
      <section>
        <h2 className="font-serif text-2xl mb-4">Manage Availability Slots</h2>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{ left: 'prev,next today', center: 'title', right: 'timeGridWeek,dayGridMonth' }}
            events={events}
            eventClick={handleEventClick}
            selectable={true}
            select={(info) => {
              handleAddSlot(info.startStr, info.endStr);
              info.view.calendar.unselect();
            }}
            height="auto"
            slotMinTime="09:00:00"
            slotMaxTime="17:00:00"
            allDaySlot={false}
          />
          {selectedSlot && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex justify-between items-center">
              <span>
                Selected: {new Date(selectedSlot.start_time).toLocaleString()} – {new Date(selectedSlot.end_time).toLocaleTimeString()}
                {selectedSlot.is_booked && <span className="ml-2 text-red-500">(Booked)</span>}
              </span>
              <button onClick={handleDeleteSlot} className="text-red-500 hover:underline">Delete Slot</button>
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">Click and drag on calendar to add new slots. Click on a slot to select and delete.</p>
        </div>
      </section>

      {/* Consultations List */}
      <section>
        <h2 className="font-serif text-2xl mb-4">Consultations</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Client</th>
                <th className="py-3 px-4 text-left">Scheduled</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map(c => (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{c.client_id?.slice(0,8)}...</td>
                  <td className="py-3 px-4">{new Date(c.scheduled_at).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <select
                      value={c.status}
                      onChange={async (e) => {
                        await supabase.from('consultations').update({ status: e.target.value }).eq('id', c.id);
                      }}
                      className="border rounded px-2 py-1 text-xs"
                    >
                      <option value="pending_payment">Pending</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 capitalize">{c.payment_status}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleJoinMeeting(c)}
                      className="text-prakash-gold hover:underline text-xs mr-2"
                    >
                      Join
                    </button>
                    <button
                      onClick={() => navigator.clipboard?.writeText(c.meeting_url || '')}
                      className="text-gray-500 hover:underline text-xs"
                    >
                      Copy Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Meeting Preview Modal */}
      <AnimatePresence>
        {showMeeting && selectedConsultation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowMeeting(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-serif text-xl">Meeting: {selectedConsultation.id}</h3>
                <button onClick={() => setShowMeeting(false)} className="text-2xl">&times;</button>
              </div>
              <div className="p-4">
                <MeetingRoom
                  consultationId={selectedConsultation.id}
                  scheduledAt={selectedConsultation.scheduled_at}
                  status={selectedConsultation.status}
                  meetingUrl={selectedConsultation.meeting_url}
                  onMeetingEnd={() => setShowMeeting(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
