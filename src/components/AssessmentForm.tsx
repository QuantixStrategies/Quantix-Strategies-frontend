import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Question, AssessmentResponses, AssessmentTrack } from '@/types/assessment';

interface AssessmentFormProps {
  questions: Question[];
  track: AssessmentTrack;
  onComplete: (responses: AssessmentResponses) => void;
}

export function AssessmentForm({ questions, track, onComplete }: AssessmentFormProps) {
  const [responses, setResponses] = useState<AssessmentResponses>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(responses);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = responses[currentQuestion.id] !== undefined;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-medium to-teal transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-xl">
            {currentQuestion.question}
          </CardTitle>
          {currentQuestion.type === 'scaled' && currentQuestion.labels && (
            <CardDescription>
              {currentQuestion.labels.min} → {currentQuestion.labels.max}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {currentQuestion.type === 'scaled' ? (
            <RadioGroup
              value={responses[currentQuestion.id]?.toString()}
              onValueChange={(value) => handleResponse(currentQuestion.id, parseInt(value))}
              className="space-y-4"
            >
              {currentQuestion.scale.map((value) => (
                <div key={value} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                  <RadioGroupItem value={value.toString()} id={`${currentQuestion.id}-${value}`} />
                  <Label 
                    htmlFor={`${currentQuestion.id}-${value}`}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {value}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <RadioGroup
              value={responses[currentQuestion.id]?.toString()}
              onValueChange={(value) => handleResponse(currentQuestion.id, parseInt(value))}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value="1" id={`${currentQuestion.id}-yes`} />
                <Label 
                  htmlFor={`${currentQuestion.id}-yes`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent transition-colors">
                <RadioGroupItem value="0" id={`${currentQuestion.id}-no`} />
                <Label 
                  htmlFor={`${currentQuestion.id}-no`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  No
                </Label>
              </div>
            </RadioGroup>
          )}

          <div className="flex justify-between mt-8 gap-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="w-32"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isAnswered}
              className="w-32"
            >
              {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
