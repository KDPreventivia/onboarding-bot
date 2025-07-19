-- Create table for health questionnaire responses
CREATE TABLE public.health_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  responses JSONB NOT NULL,
  total_score INTEGER NOT NULL,
  score_category TEXT NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.health_assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (since no auth is required)
CREATE POLICY "Anyone can insert health assessments" 
ON public.health_assessments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to view own assessments (if user_id is provided)
CREATE POLICY "Users can view their own assessments" 
ON public.health_assessments 
FOR SELECT 
USING (user_id IS NULL OR auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_health_assessments_user_id ON public.health_assessments(user_id);
CREATE INDEX idx_health_assessments_completed_at ON public.health_assessments(completed_at);