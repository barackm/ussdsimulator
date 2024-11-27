import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PhoneInput } from "../ui/phone-input";
import { useUssdConfigStore } from "~/stores/ussd-config-store";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const FormSchema = z.object({
  phoneNumber: z.string().min(10),
  serviceCode: z
    .string()
    .regex(
      /^\*[\d*#]+#$/,
      "USSD code must start with *, end with #, and can contain numbers, * and # in between."
    ),
  callbackUrl: z.string().url(),
});

const UssdConfigModal = (props: Props) => {
  const { open, onClose } = props;
  const setConfig = useUssdConfigStore((state) => state.setConfig);
  const config = useUssdConfigStore((state) => state);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
      serviceCode: "",
      callbackUrl: "",
    },
  });

  useEffect(() => {
    if (
      form.getValues("phoneNumber") !== config.phoneNumber ||
      form.getValues("serviceCode") !== config.serviceCode ||
      form.getValues("callbackUrl") !== config.callbackUrl
    ) {
      form.reset({
        phoneNumber: config.phoneNumber,
        serviceCode: config.serviceCode,
        callbackUrl: config.callbackUrl,
      });
    }
  }, [config, form]);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setConfig({
      phoneNumber: data.phoneNumber,
      serviceCode: data.serviceCode,
      callbackUrl: data.callbackUrl,
    });

    localStorage.setItem("ussdConfig", JSON.stringify(data));
    setConfig({ showConfigModal: false });
  };

  const isConfigEmpty =
    !config.phoneNumber && !config.serviceCode && !config.callbackUrl;

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (isConfigEmpty) return;
        onClose();
      }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>USSD Configuration</DialogTitle>
              <DialogDescription>
                Configure the USSD settings.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center flex-col space-x-2 w-full">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a valid phone number with country
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>USSD Code</FormLabel>
                    <FormControl>
                      <Input placeholder="*123#" {...field} />
                    </FormControl>
                    <FormDescription>Enter the USSD code.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="callbackUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Callback URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/ussd"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter the callback URL.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                size="sm"
                className="px-3"
                onClick={form.handleSubmit(onSubmit)}
              >
                Update
              </Button>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isConfigEmpty}
                >
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default UssdConfigModal;
