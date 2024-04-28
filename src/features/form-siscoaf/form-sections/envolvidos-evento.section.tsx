import { useFieldArray, useFormContext } from "react-hook-form";
import { IFormSiscoaf } from "../form-siscoaf.schema";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formDefaultRelatedPersonValues, formLabels } from "../constants";
import { Button } from "@/components/ui/button";
import { MouseEventHandler, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getTypes } from "@/api/related-people/related-people.client";
import { inputMask } from "@/lib/input-mask";

export function EnvolvidosEventoSection() {
  const form = useFormContext<IFormSiscoaf>();

  const { fields, append } = useFieldArray<IFormSiscoaf>({
    name: "LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO",
    control: form.control,
  });

  const handleAppendNew: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      append(formDefaultRelatedPersonValues);
    }, [append]);

  const { data: typesOptions } = useQuery(getTypes().queryOptions);

  return (
    <section className="flex flex-col flex-wrap gap-x-8 gap-y-4">
      envolvidos
      <Button onClick={handleAppendNew}>Adicionar pessoa</Button>
      <fieldset className="flex flex-col gap-2">
        <legend> teste</legend>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 gap-4 rounded-lg border bg-amber-50 p-4 sm:grid-cols-2 md:grid-cols-4  lg:grid-cols-5"
          >
            <FormField
              control={form.control}
              name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.TpEnv`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.ENVOLVIDO.TpEnv}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typesOptions?.relationshipType.map((type) => (
                        <SelectItem value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.ServPub`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.ENVOLVIDO.ServPub}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typesOptions?.publicServantType.map((type) => (
                        <SelectItem value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.NmEnv`}
              render={({ field }) => (
                <FormItem className="md:col-span-2 lg:col-span-2">
                  <FormLabel>{formLabels.ENVOLVIDO.NmEnv}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.CPFCNPJEnv`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formLabels.ENVOLVIDO.CPFCNPJEnv}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) =>
                        field.onChange(inputMask.cpfCnpj(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2 md:col-span-3 lg:col-span-5">
              <div className="flex h-full flex-wrap items-center justify-start gap-x-8 gap-y-4">
                <FormField
                  control={form.control}
                  name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.PObrigada`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-4 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{formLabels.ENVOLVIDO.PObrigada}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`LOTE.OCORRENCIAS.OCORRENCIA.ENVOLVIDOS.ENVOLVIDO.${index}.PEP`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-4 space-y-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>{formLabels.ENVOLVIDO.PEP}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </fieldset>
    </section>
  );
}
