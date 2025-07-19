import heroImage from '@/assets/health-hero.jpg';

export default function QuestionnaireHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary-glow/10">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold gradient-text">
                Health Behavior Assessment
              </h1>
              <p className="text-xl text-muted-foreground">
                Understand your current health habits and get personalized recommendations
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">10 comprehensive questions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Evidence-based assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Personalized insights</span>
              </div>
            </div>

            <div className="bg-card p-4 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Privacy Notice:</strong> Your responses are confidential and will be used solely to provide you with personalized health recommendations.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-2xl transform rotate-3"></div>
            <img
              src={heroImage}
              alt="Health and wellness assessment"
              className="relative z-10 w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}