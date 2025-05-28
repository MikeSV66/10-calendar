import { useDispatch, useSelector } from "react-redux";
import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent, onDeleteEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    const startSavindEvent =  async ( calendarEvent ) => {
        //TODO: Llegar al backernd

        // todo bien
        if ( calendarEvent._id ) {
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }
    }

    const startDeletingEvent = () => {
        // todo: llegar al backend

        dispatch( onDeleteEvent() );
    }

    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* Métodos
        setActiveEvent,
        startSavindEvent,
        startDeletingEvent,
    }
}