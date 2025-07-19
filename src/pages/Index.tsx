import QuestionnaireHeader from '@/components/QuestionnaireHeader';
import HealthQuestionnaire from '@/components/HealthQuestionnaire';

const Index = () => {
  return (
    <div className="min-h-screen">
      <QuestionnaireHeader />
      <div className="py-12">
        <HealthQuestionnaire />
      </div>
    </div>
  );
};

export default Index;
