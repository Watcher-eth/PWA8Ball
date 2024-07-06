// @ts-nocheck

// useCreateTopic.ts
import { useMutation } from '@tanstack/react-query';
import { supabase } from "@/lib/supabase/supabaseClient";
import { NewTopic, ITopic } from '../types';

const createTopic = async (newTopic: NewTopic): Promise<ITopic> => {
  const { data, error } = await supabase
    .from<ITopic>('topics')
    .insert([newTopic])
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useCreateTopic = () => {
  return useMutation({
    mutationFn: createTopic,
  });
};
