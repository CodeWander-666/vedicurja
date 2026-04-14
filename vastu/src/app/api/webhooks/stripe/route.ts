import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!stripeSecret || !webhookSecret || !supabaseUrl || !supabaseKey) {
  console.warn('Stripe webhook: Missing environment variables. Webhook will be inactive.');
}

const stripe = stripeSecret ? new Stripe(stripeSecret) : null;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(req: Request) {
  if (!stripe || !supabase) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    if (!session.client_reference_id) {
      return NextResponse.json({ error: 'Missing client_reference_id' }, { status: 400 });
    }
    await supabase.from('payments').insert({
      user_id: session.client_reference_id,
      amount: session.amount_total! / 100,
      status: 'succeeded',
      provider: 'stripe',
      provider_payment_intent_id: session.payment_intent,
      created_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true });
}
