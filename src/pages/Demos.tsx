import Navbar from "@/components/Navbar";

const Demos = () => {
  return (
    <div className="h-screen w-screen bg-background flex flex-col">
      <Navbar />
      <iframe
        src="https://www.labelradar.com/labels/denar/portal"
        width="100%"
        frameBorder="0"
        className="w-full flex-1 border-0"
        title="Demos Portal"
      />
    </div>
  );
};

export default Demos;
