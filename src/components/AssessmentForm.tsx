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

  const handleResponse = (questionId: string, value: number) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    onComplete(responses);
  };

  const answeredCount = Object.keys(responses).length;
  const progress = (answeredCount / questions.length) * 100;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {questions.length} questions answered
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-medium to-teal transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id} className="border-2 transition-all duration-300 hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg flex-1">
                  <span className="text-primary mr-2">{index + 1}.</span>
                  {question.question}
                </CardTitle>
                {responses[question.id] !== undefined && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    ✓ Answered
                  </span>
                )}
              </div>
              {question.type === 'scaled' && question.labels && (
                <CardDescription>
                  {question.labels.min} → {question.labels.max}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {question.type === 'scaled' ? (
                <RadioGroup
                  value={responses[question.id]?.toString()}
                  onValueChange={(value) => handleResponse(question.id, parseInt(value))}
                  className="space-y-3"
                >
                  {question.scale.map((value) => (
                    <div key={value} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <RadioGroupItem value={value.toString()} id={`${question.id}-${value}`} />
                      <Label 
                        htmlFor={`${question.id}-${value}`}
                        className="flex-1 cursor-pointer font-medium"
                      >
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <RadioGroup
                  value={responses[question.id]?.toString()}
                  onValueChange={(value) => handleResponse(question.id, parseInt(value))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="1" id={`${question.id}-yes`} />
                    <Label 
                      htmlFor={`${question.id}-yes`}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                    <RadioGroupItem value="0" id={`${question.id}-no`} />
                    <Label 
                      htmlFor={`${question.id}-no`}
                      className="flex-1 cursor-pointer font-medium"
                    >
                      No
                    </Label>
                  </div>
                </RadioGroup>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-0 left-0 right-0 mt-8 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(progress)}%
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1">
                    {answeredCount} of {questions.length} questions completed
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-medium to-teal transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              size="lg"
              className="shrink-0"
            >
              Submit Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
