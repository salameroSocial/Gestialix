import React, { useState, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import AsistenciaBase from '../../Components/Asistencia/AsistenciaBase';

export default function ComedorAttendance() {

    return (
        <AppLayout>
            <AsistenciaBase></AsistenciaBase>
        </AppLayout>
    );
}
