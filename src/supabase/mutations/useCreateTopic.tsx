// @ts-nocheck
import { useMutation } from '@tanstack/react-query';
import { supabase } from "@/supabase/supabaseClient";
import { NewTopic, ITopic } from '@/supabase/types';

async function createTopic(newTopic: NewTopic): Promise<ITopic> {
  const { data, error } = await supabase
    .from<ITopic>('topics')
    .insert([newTopic])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export function useCreateTopic() {
  return useMutation({
    mutationFn: createTopic,
  });
};
