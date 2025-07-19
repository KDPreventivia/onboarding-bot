import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    points: number;
  }>;
}

const healthQuestions: Question[] = [
  {
    id: 'exercise',
    question: 'How often do you engage in physical exercise?',
    options: [
      { value: 'daily', label: 'Daily (7 days/week)', points: 4 },
      { value: 'regular', label: 'Regularly (4-6 days/week)', points: 3 },
      { value: 'sometimes', label: 'Sometimes (2-3 days/week)', points: 2 },
      { value: 'rarely', label: 'Rarely (1 day/week)', points: 1 },
      { value: 'never', label: 'Never', points: 0 }
    ]
  },
  {
    id: 'nutrition',
    question: 'How would you describe your overall nutrition habits?',
    options: [
      { value: 'excellent', label: 'Excellent - balanced meals with fruits/vegetables daily', points: 4 },
      { value: 'good', label: 'Good - mostly healthy with occasional treats', points: 3 },
      { value: 'fair', label: 'Fair - some healthy choices, some processed foods', points: 2 },
      { value: 'poor', label: 'Poor - mostly processed or fast foods', points: 1 },
      { value: 'very-poor', label: 'Very poor - little attention to nutrition', points: 0 }
    ]
  },
  {
    id: 'sleep',
    question: 'How many hours of sleep do you typically get per night?',
    options: [
      { value: '8-plus', label: '8+ hours consistently', points: 4 },
      { value: '7-8', label: '7-8 hours most nights', points: 3 },
      { value: '6-7', label: '6-7 hours most nights', points: 2 },
      { value: '5-6', label: '5-6 hours most nights', points: 1 },
      { value: 'less-5', label: 'Less than 5 hours', points: 0 }
    ]
  },
  {
    id: 'stress',
    question: 'How well do you manage stress in your daily life?',
    options: [
      { value: 'excellent', label: 'Excellent - I have effective stress management techniques', points: 4 },
      { value: 'good', label: 'Good - I manage stress well most of the time', points: 3 },
      { value: 'fair', label: 'Fair - stress sometimes affects my daily life', points: 2 },
      { value: 'poor', label: 'Poor - I struggle with stress management', points: 1 },
      { value: 'very-poor', label: 'Very poor - stress significantly impacts my life', points: 0 }
    ]
  },
  {
    id: 'water',
    question: 'How much water do you drink daily?',
    options: [
      { value: '8-plus', label: '8+ glasses (64+ oz)', points: 4 },
      { value: '6-8', label: '6-8 glasses (48-64 oz)', points: 3 },
      { value: '4-6', label: '4-6 glasses (32-48 oz)', points: 2 },
      { value: '2-4', label: '2-4 glasses (16-32 oz)', points: 1 },
      { value: 'less-2', label: 'Less than 2 glasses', points: 0 }
    ]
  },
  {
    id: 'smoking',
    question: 'What is your smoking status?',
    options: [
      { value: 'never', label: 'Never smoked', points: 4 },
      { value: 'quit-5plus', label: 'Quit 5+ years ago', points: 3 },
      { value: 'quit-recent', label: 'Quit within the last 5 years', points: 2 },
      { value: 'occasional', label: 'Occasional smoker', points: 1 },
      { value: 'regular', label: 'Regular smoker', points: 0 }
    ]
  },
  {
    id: 'alcohol',
    question: 'How often do you consume alcohol?',
    options: [
      { value: 'never', label: 'Never or very rarely', points: 4 },
      { value: 'monthly', label: '1-2 times per month', points: 3 },
      { value: 'weekly', label: '1-2 times per week', points: 2 },
      { value: 'frequent', label: '3-4 times per week', points: 1 },
      { value: 'daily', label: 'Daily or almost daily', points: 0 }
    ]
  },
  {
    id: 'checkups',
    question: 'How often do you visit healthcare providers for check-ups?',
    options: [
      { value: 'regular', label: 'Regular annual check-ups and screenings', points: 4 },
      { value: 'mostly', label: 'Most recommended check-ups', points: 3 },
      { value: 'sometimes', label: 'Sometimes, when I remember', points: 2 },
      { value: 'rarely', label: 'Rarely, only when sick', points: 1 },
      { value: 'never', label: 'Almost never', points: 0 }
    ]
  },
  {
    id: 'mental-health',
    question: 'How do you prioritize your mental health and emotional well-being?',
    options: [
      { value: 'proactive', label: 'Very proactive - regular self-care and mindfulness', points: 4 },
      { value: 'aware', label: 'Aware and take action when needed', points: 3 },
      { value: 'sometimes', label: 'Sometimes pay attention to it', points: 2 },
      { value: 'reactive', label: 'Only when problems arise', points: 1 },
      { value: 'neglect', label: 'I tend to neglect mental health', points: 0 }
    ]
  },
  {
    id: 'social',
    question: 'How would you describe your social connections and relationships?',
    options: [
      { value: 'strong', label: 'Strong support network with regular social interaction', points: 4 },
      { value: 'good', label: 'Good relationships with regular contact', points: 3 },
      { value: 'moderate', label: 'Moderate social connections', points: 2 },
      { value: 'limited', label: 'Limited social connections', points: 1 },
      { value: 'isolated', label: 'Often feel isolated or lonely', points: 0 }
    ]
  }
];

export default function HealthQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / healthQuestions.length) * 100;
  const currentQuestion = healthQuestions[currentStep];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (!answers[currentQuestion.id]) {
      toast({
        title: "Please select an answer",
        description: "Please choose an option before continuing.",
        variant: "destructive"
      });
      return;
    }

    if (currentStep < healthQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    // Calculate total score
    const totalScore = healthQuestions.reduce((sum, question) => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      return sum + (option?.points || 0);
    }, 0);

    const maxScore = healthQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    // Here you would normally save to Supabase
    console.log('Questionnaire completed:', { answers, totalScore, percentage });
    
    setIsComplete(true);
    toast({
      title: "Questionnaire Complete!",
      description: `Your health score: ${percentage}%. Results ready for review.`
    });
  };

  const getScoreCategory = () => {
    const totalScore = healthQuestions.reduce((sum, question) => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      return sum + (option?.points || 0);
    }, 0);

    const maxScore = healthQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);

    if (percentage >= 80) return { category: 'Excellent', color: 'text-success', description: 'Outstanding health behaviors!' };
    if (percentage >= 60) return { category: 'Good', color: 'text-primary', description: 'Strong foundation with room for improvement.' };
    if (percentage >= 40) return { category: 'Fair', color: 'text-yellow-600', description: 'Several areas for health improvement.' };
    return { category: 'Needs Improvement', color: 'text-destructive', description: 'Multiple opportunities for positive change.' };
  };

  if (isComplete) {
    const { category, color, description } = getScoreCategory();
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="questionnaire-card">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl gradient-text">Assessment Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-2">
              <h3 className={`text-xl font-semibold ${color}`}>{category}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
            
            <div className="bg-accent/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Your responses have been recorded. A healthcare professional will review your assessment and provide personalized recommendations.
              </p>
            </div>

            <Button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Take Assessment Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentStep + 1} of {healthQuestions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="questionnaire-card">
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={answers[currentQuestion.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion.id]}
              className="btn-primary flex items-center gap-2"
            >
              {currentStep === healthQuestions.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}