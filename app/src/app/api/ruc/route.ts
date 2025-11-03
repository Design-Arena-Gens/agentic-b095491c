import { NextResponse } from 'next/server';

const RUC_REGEX = /^\d{11}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ruc = searchParams.get('ruc')?.trim() ?? '';

  if (!RUC_REGEX.test(ruc)) {
    return NextResponse.json(
      { error: 'El RUC debe contener exactamente 11 dígitos.' },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(`https://api.apis.net.pe/v1/ruc?numero=${ruc}`, {
      headers: {
        accept: 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Fallo consulta API RUC', response.status, errorBody);
      return NextResponse.json(
        { error: 'No se pudo obtener información del RUC en este momento.' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json({
      razonSocial: data.nombre ?? null,
      estado: data.estado ?? null,
      condicion: data.condicion ?? null,
      direccion: data.direccion ?? null,
      ubigeo: data.ubigeo ?? null,
      distrito: data.distrito ?? null,
      provincia: data.provincia ?? null,
      departamento: data.departamento ?? null,
      fuente: 'api.apis.net.pe',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error inesperado consultando RUC', error);
    return NextResponse.json(
      { error: 'Error inesperado consultando el RUC.' },
      { status: 500 },
    );
  }
}

