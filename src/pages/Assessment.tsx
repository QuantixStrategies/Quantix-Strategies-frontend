import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AssessmentForm } from '@/components/AssessmentForm';
import { AssessmentResults } from '@/components/AssessmentResults';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AssessmentTrack, AssessmentResponses, AssessmentResult } from '@/types/assessment';
import { strategicQuestions, operationalQuestions } from '@/utils/assessmentQuestions';
import { calculateScore, calculateComprehensiveScore } from '@/utils/assessmentScoring';

export default function Assessment() {
  const [selectedTrack, setSelectedTrack] = useState<AssessmentTrack | null>(null);
  const [isAssessing, setIsAssessing] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [comprehensiveStep, setComprehensiveStep] = useState<'strategic' | 'operational' | null>(null);
  const [strategicResponses, setStrategicResponses] = useState<AssessmentResponses>({});

  const startAssessment = (track: AssessmentTrack) => {
    setSelectedTrack(track);
    setIsAssessing(true);
    if (track === 'comprehensive') {
      setComprehensiveStep('strategic');
    }
  };

  const handleAssessmentComplete = (responses: AssessmentResponses) => {
    if (selectedTrack === 'comprehensive' && comprehensiveStep === 'strategic') {
      setStrategicResponses(responses);
      setComprehensiveStep('operational');
    } else if (selectedTrack === 'comprehensive' && comprehensiveStep === 'operational') {
      const comprehensiveResult = calculateComprehensiveScore(strategicResponses, responses);
      setResult(comprehensiveResult);
      setIsAssessing(false);
    } else if (selectedTrack) {
      const assessmentResult = calculateScore(responses, selectedTrack);
      setResult(assessmentResult);
      setIsAssessing(false);
    }
  };

  const resetAssessment = () => {
    setSelectedTrack(null);
    setIsAssessing(false);
    setResult(null);
    setComprehensiveStep(null);
    setStrategicResponses({});
  };

  if (result) {
    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="min-h-screen bg-background pt-20">
          <AssessmentResults result={result} onRestart={resetAssessment} />
        </main>
        <Footer />
      </div>
    );
  }

  if (isAssessing && selectedTrack) {
    const questions = selectedTrack === 'strategic' || comprehensiveStep === 'strategic'
      ? strategicQuestions
      : operationalQuestions;
    
    const currentTrack = comprehensiveStep || selectedTrack;

    return (
      <div className="animate-fade-in">
        <Navigation />
        <main className="min-h-screen bg-background pt-20">
          {comprehensiveStep && (
            <div className="text-center py-4 bg-accent">
              <p className="text-sm font-medium">
                Comprehensive Assessment: {comprehensiveStep === 'strategic' ? 'Strategic Focus (Step 1 of 2)' : 'Operational Excellence (Step 2 of 2)'}
              </p>
            </div>
          )}
          <AssessmentForm 
            questions={questions} 
            track={currentTrack as AssessmentTrack}
            onComplete={handleAssessmentComplete} 
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Navigation />
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto py-16 px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Founder Strategic Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Identify key leadership challenges and unlock strategic bandwidth with our data-driven assessment framework
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Strategic Focus Audit</CardTitle>
                <CardDescription className="text-base">
                  Evaluate your bandwidth, planning consistency, delegation effectiveness, and organizational alignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• 7 scaled questions</li>
                  <li>• 3 binary questions</li>
                  <li>• 10-15 minutes</li>
                </ul>
                <Button 
                  onClick={() => startAssessment('strategic')}
                  className="w-full bg-gradient-to-r from-blue-medium to-teal"
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="text-2xl">Operational Excellence Index</CardTitle>
                <CardDescription className="text-base">
                  Systems, structure & execution - Evaluate role clarity, communication, stakeholder management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• 7 scaled questions</li>
                  <li>• 4 binary questions</li>
                  <li>• 10-15 minutes</li>
                </ul>
                <Button 
                  onClick={() => startAssessment('operational')}
                  className="w-full bg-gradient-to-r from-blue-medium to-teal"
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-teal hover:border-primary transition-colors bg-gradient-to-br from-blue-pale/10 to-teal/10">
              <CardHeader>
                <CardTitle className="text-2xl">Comprehensive Leadership Assessment</CardTitle>
                <CardDescription className="text-base">
                  Complete strategic and operational assessment for holistic insights and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                  <li>• All questions combined</li>
                  <li>• 21 total questions</li>
                  <li>• 20-30 minutes</li>
                </ul>
                <Button 
                  onClick={() => startAssessment('comprehensive')}
                  className="w-full bg-gradient-to-r from-navy to-teal"
                >
                  Start Full Assessment
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Why This Assessment?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  After working with 145+ founders across family offices, fund managers, and corporates, we've identified 
                  a consistent pattern: <strong className="text-foreground">founder bandwidth and operational excellence are the #1 bottlenecks to scaling.</strong>
                </p>
                <p>
                  This assessment quantifies where you are on critical dimensions of strategic focus and operational 
                  effectiveness, providing you with a data-driven roadmap to reclaim 15-25 hours per week and improve 
                  execution velocity by 40-70%.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
