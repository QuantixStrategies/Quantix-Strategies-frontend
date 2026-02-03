import { AssessmentResult } from '@/types/assessment';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface AssessmentResultsProps {
  result: AssessmentResult;
  onRestart?: () => void;
}

export function AssessmentResults({ result, onRestart }: AssessmentResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-red-600';
    if (score >= 55) return 'text-orange-600';
    if (score >= 35) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-red-100 dark:bg-red-950';
    if (score >= 55) return 'bg-orange-100 dark:bg-orange-950';
    if (score >= 35) return 'bg-yellow-100 dark:bg-yellow-950';
    return 'bg-green-100 dark:bg-green-950';
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Assessment Results</h2>
        <p className="text-muted-foreground">
          {result.track === 'strategic' && 'Strategic Focus Assessment'}
          {result.track === 'operational' && 'Operational Excellence Assessment'}
          {result.track === 'comprehensive' && 'Comprehensive Leadership Assessment'}
        </p>
      </div>

      <Card className={`border-2 ${getScoreBgColor(result.score)}`}>
        <CardHeader className="text-center">
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.score)}`}>
            {result.score}
          </div>
          <CardTitle className="text-2xl">{result.interpretation.label}</CardTitle>
          <CardDescription className="text-base mt-2">
            Score Range: {result.interpretation.range} | {result.interpretation.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <h4 className="font-semibold mb-2">Recommended Action:</h4>
              <p className="text-muted-foreground">{result.interpretation.action}</p>
            </div>
            {result.interpretation.roiRange && (
              <div className="p-4 bg-background rounded-lg">
                <h4 className="font-semibold mb-2">Expected ROI Range:</h4>
                <p className="text-2xl font-bold text-primary">{result.interpretation.roiRange}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategic Value Propositions</CardTitle>
          <CardDescription>
            Based on your assessment, here are the key areas where Quantix Strategies can help:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {result.valuePropositions.map((proposition, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{proposition}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Ready to transform your leadership effectiveness?
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-medium to-teal">
            Schedule Consultation
          </Button>
          {onRestart && (
            <Button variant="outline" size="lg" onClick={onRestart}>
              Take Another Assessment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
