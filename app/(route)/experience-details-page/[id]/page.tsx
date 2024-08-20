import ExperienceClientPage from '../_components/ExperienceClientPage';

type Params = {
  id: string;
};

export default function ExperiencePage({ params }: { params: Params }) {
  const { id: activityId } = params;

  return <ExperienceClientPage activityId={activityId} />;
}
