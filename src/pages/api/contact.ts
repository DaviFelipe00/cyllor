import type { APIRoute } from 'astro';
import { createLead } from '../../lib/db';

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function redirectTo(request: Request, status: 'success' | 'error') {
  const url = new URL(request.url);
  url.pathname = '/contato';
  url.search = `?contact=${status}`;
  url.hash = 'contact';

  return new Response(null, {
    status: 303,
    headers: {
      Location: url.toString(),
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  if ((formData.get('website') || '').toString().trim()) {
    return redirectTo(request, 'success');
  }

  const payload = {
    name: (formData.get('name') || '').toString().trim(),
    email: (formData.get('email') || '').toString().trim().toLowerCase(),
    company: (formData.get('company') || '').toString().trim(),
    interest: (formData.get('interest') || '').toString().trim(),
    challenge: (formData.get('challenge') || '').toString().trim(),
  };

  const isValid =
    payload.name.length > 0 &&
    payload.email.length > 0 &&
    isValidEmail(payload.email) &&
    payload.company.length > 0 &&
    payload.interest.length > 0 &&
    payload.challenge.length > 0;

  if (!isValid) {
    return redirectTo(request, 'error');
  }

  createLead(payload);
  return redirectTo(request, 'success');
};
