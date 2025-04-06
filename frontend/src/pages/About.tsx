import TopBar from '../components/TopBar';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-display mb-8 text-center">
            <span className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              About DermoAI
            </span>
          </h1>
          <div className="prose prose-lg mx-auto">
            <p>
              This is test text for the About page. The content will be replaced with actual information about DermoAI, its mission, and its capabilities.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;