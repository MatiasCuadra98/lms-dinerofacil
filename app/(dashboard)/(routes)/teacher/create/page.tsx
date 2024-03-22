"use client"

import * as z from "zod";
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

//creamos el esquema del formulario para crear los cursos
const formSchema = z.object({
    title:z.string().min(1,{
        message:"Title is required",
    }),
});

//creamos la vista de la pagina para crear los cursos con sus respectivos hooks
const CreatePage = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    //realizamos el envio de la  request a nuestra API
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/course", values);
            router.push(`/teacher/courses/${response.data.id}`)
        } catch  {
            toast.error("Algo salio mal")
        }
    }

    //estilizamos el form
    return ( 
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                Nombra tu curso
                </h1>           
                <p className="text-sm text-slate-600">
                    Como te gustaria nombrar tu curso? No te preocupes, lo podras cambiar mas tarde.
                </p>
                <Form {...form}>
                    <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                    >
                     <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) =>(
                        <FormItem>
                             <FormLabel>
                                Titulo del curso
                             </FormLabel>
                             <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="ej. 'Obligaciones Negociables'"
                                //...field para no escribir el onchage, blur, etc ya que lo tramos del archivo controller.ts
                                {...field}
                                />
                             </FormControl>
                             <FormDescription>
                                Que es lo que enseñas en este curso?
                             </FormDescription>
                             <FormMessage />
                        </FormItem>
                     )}
                     />
                      <div className="flex items-center gap-x-2">
                        <Link href="/">
                            <Button
                            type="button"
                            variant="ghost"
                            >
                                Cancelar
                            </Button>
                        </Link>
                        <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        >
                            Continuar
                        </Button>
                      </div>
                    </form>

                </Form>
            </div> 
        </div>
     );
}
 
export default CreatePage;