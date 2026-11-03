import { useApp } from "../../context/AppContext";

export default function HowItWorksPipeline() {
  const { isDarkMode } = useApp();

  const steps = [
    {
      num: "01",
      title: "Register",
      desc: "Create your LifeLink account and provide the necessary blood group and contact information.",
      tag: "Step Initiator",
      icon: "person_add",
    },
    {
      num: "02",
      title: "Find or Request",
      desc: "Search for donors by blood group and location, or create an urgent blood request with hospital details.",
      tag: "Discovery & Match",
      icon: "search",
    },
    {
      num: "03",
      title: "Connect",
      desc: "Connect with relevant donors through the platform safely while protecting private contact info.",
      tag: "Secure Bridge",
      icon: "quickreply",
    },
    {
      num: "04",
      title: "Make a Difference",
      desc: "Coordinate with the relevant individuals and healthcare facilities to support safe blood donation.",
      tag: "Life Completed",
      icon: "healing",
      isEnd: true,
    },
  ];

  return (
    <section
      className={`py-16 lg:py-24 transition-colors ${
        isDarkMode ? "bg-[#0F172A]" : "bg-[#fbf8f8]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#dc2626] mb-2 block">
            Step-By-Step Flow
          </span>
          <h2
            className={`text-3xl lg:text-4xl font-black tracking-tight ${
              isDarkMode ? "text-white" : "text-[#1a0e0e]"
            }`}
          >
            Making Blood Donation Simple
          </h2>
          <p
            className={`text-sm lg:text-base mt-3 ${
              isDarkMode ? "text-slate-400" : "text-[#5c403c]"
            }`}
          >
            A straightforward process that helps connect donors with people who need blood quickly and respectfully.
          </p>
        </div>

        {/* Pipeline Card Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className={`border-2 border-transparent hover:border-[#dc2626]/40 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group ${
                isDarkMode
                  ? "bg-[#1E293B] text-white"
                  : "bg-white text-[#1a0e0e]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-16 h-16 rounded-2xl text-[#dc2626] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${
                      isDarkMode ? "bg-red-950/60" : "bg-red-100"
                    }`}
                  >
                    <span className="material-symbols-outlined text-3xl">
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-[#dc2626] text-white tracking-widest">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-[#5c403c]"
                  }`}
                >
                  {step.desc}
                </p>
              </div>

              <div
                className={`mt-8 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                  isDarkMode
                    ? "border-[#334155] text-slate-400"
                    : "border-[#f2e8e8] text-[#945151]"
                }`}
              >
                <span>{step.tag}</span>
                <span className="material-symbols-outlined text-[#dc2626] group-hover:translate-x-1 transition-transform">
                  {step.isEnd ? "check_circle" : "arrow_forward"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}