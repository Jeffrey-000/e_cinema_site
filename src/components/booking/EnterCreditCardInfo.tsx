//payment information (card type, number, and expiration date, and billing address)

import { CreditCardInterface } from "./creditcard";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "../../hooks/use-toast";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";

type CreditCardFormProps = {
  refresh: boolean; //triggers the parent useEffect
  setRefresh: (e: boolean) => void;
};

const formSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Card number must be between 13 and 19 digits"),
  cardName: z.string().min(1, "Name is required"),
  exp: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/(\d{2})$/,
      "Invalid expiration date. Format as MM/YY",
    ),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3-4 digits"),
  address: z.string().min(1, "Address is required"),
  cardType: z.enum(["visa", "mastercard", "discover", "amex"]),
});

export default function CreditCardForm({
  refresh,
  setRefresh,
}: CreditCardFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      exp: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // console.log(values);
    // console.log(JSON.stringify(values));
    try {
      const response = await fetch("/api/creditcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      setRefresh(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="pt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expiration Date</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CVV</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Type</FormLabel>
                <FormControl>
                  <select {...field} className="w-full rounded border p-2">
                    <option value="">Select Card Type</option>
                    <option value="visa">VISA</option>
                    <option value="mastercard">MASTERCARD</option>
                    <option value="discover">DISCOVER</option>
                    <option value="amex">AMEX</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billing Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submiting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </main>
  );
}
