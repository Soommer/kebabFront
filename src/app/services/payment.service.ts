import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { loadStripe } from "@stripe/stripe-js";
import { firstValueFrom } from "rxjs";

export interface PaymentReq {
  cartId: string;
  email: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private stripePromise = loadStripe('pk_test_51RNxdORTFsgqGCtobjzVruZxg0NUIvBY3ktfkeEPubisKFStX6tEve7osXlwK5H5KAerHEsb3c2haTcOScbhXvtV00IqPQ5AZO');

  constructor(private http: HttpClient) {}

  async startPayment(paymentRequest: PaymentReq) {
    console.log("Rozpoczynam płatność z danymi:", paymentRequest);

    const session = await firstValueFrom(this.http.post<{ sessionId: string }>(
      'https://localhost:7247/api/payment/create-payment-session',
      paymentRequest
    ));

    console.log("Odebrano sessionId:", session?.sessionId);

    const stripe = await this.stripePromise;
    if (stripe && session?.sessionId) {
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

      if (result.error) {
        console.error("Stripe redirect error:", result.error.message);
      }
    } else {
      throw new Error('Nie można rozpocząć płatności');
    }
  }
}
