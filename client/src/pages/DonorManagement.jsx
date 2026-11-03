import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DonorHeader from "../components/donor/DonorHeader";
import DonorMetrics from "../components/donor/DonorMetrics";
import DonorFilters from "../components/donor/DonorFilters";
import DonorTable from "../components/donor/DonorTable";
import DonorProfileDrawer from "../components/donor/DonorProfileDrawer";
import { useApp } from "../context/AppContext";

const initialDonorsList = [
  {
    id: 1,
    name: "Kamal Perera",
    idCode: "#DNR-8092",
    email: "kamal.p@example.lk",
    phoneMasked: "077 ••• 4582",
    bloodGroup: "A+",
    district: "Colombo",
    hospital: "NHSL Area",
    lastDonation: "12 Oct 2024",
    eligibility: "Eligible Now",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB94jZdrPz9V9JmpLLLasIUC01ewy2xe8np8wHvrI92UVor4cQZ7PAWhbbZdWLXqHf4ngl-t7hvSoo9IMAus9xnmY_YYRqEPVxyMoM7oBuz71kpD1qwwXU9vGRUKPRWiM5vGK1Nofjh34JLXdwKprbBYGUYmrGnFNWbP6Qu09g0S3kvXWhNLo7p-Ko97v0-s_yYZl6-z_s59p9WmNBlgNbK4iMw-3_mstrrNlBEGGNg",
  },
  {
    id: 2,
    name: "Nimal Silva",
    idCode: "#DNR-8088",
    email: "nimal.silva@example.lk",
    phoneMasked: "071 ••• 9120",
    bloodGroup: "O+",
    district: "Gampaha",
    hospital: "Ragama Hosp.",
    lastDonation: "28 Dec 2024",
    eligibility: "In 90d recovery",
    status: "Standby",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbyQ4pYhnBBOHiYpKHfqpBW8h6b1aLnNyPtkM__o6cg6MnsHtZ67ioMvzO4oCj-N2kYQ0uC0T_RP-8AKbRBti3riUEKuv2Yj6MrGDgwo3BgL13R0bmtkSwi8ZdRgen-PEdGbLd0EA_u-P7EZAycCSHGda4pJOMgErLba_Wd8fbzsh9jeZIp8wcnXCUSAoVzj5GnefrRfECgXzJmqKSAUZIHZWM0wtwfhQ1UvwmF4tz",
  },
  {
    id: 3,
    name: "Dilini Jayasekara",
    idCode: "#DNR-8075",
    email: "dilini.j@kandy.med.lk",
    phoneMasked: "078 ••• 3311",
    bloodGroup: "AB-",
    isRare: true,
    district: "Kandy",
    hospital: "TH Peradeniya",
    lastDonation: "Never Donated",
    eligibility: "First-time ready",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWdhbsfHTFHT7__jJFUJ7d6hYtixaMbLlZaMToMe9PSh_z_cFoQW26C4uriJME4iIjjVaTzo0WB2V3vcXJkGvhHgbMu91dBfvavJoM6TdJJR-AF19b5-L3KZPGAr_wgit9YnWn8WCuyJ3VkWtrjmnvEUzzGlXxabjAhAWZB2TY5lFOYrynN6yDi2zXMDK8y9oXW9SM4K2rGp-7z0ZIJL3VaUWzRWVBYqjFlrmJ9O8m",
  },
  {
    id: 4,
    name: "Rohan Alwis",
    idCode: "#DNR-8041",
    email: "rohan.alwis@example.lk",
    phoneMasked: "072 ••• 8844",
    bloodGroup: "B-",
    district: "Galle",
    hospital: "Karapitiya Hosp.",
    lastDonation: "15 Aug 2024",
    eligibility: "Awaiting Lab Screen",
    status: "Pending Review",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGcn-L4VbgSNN6Hdsac6DO4gKmZUOlZf-8LgJmdpnjb3aDTqUw-X_ndJM5ynC2WlH7hG5N0JhcDukSBTVOUrTvIKbTzoCjroA3tRjPR_l1v_KoZkhwu-tbBgqlwaEHKy2o5cFPSkhYu-XHd8xwXA_iso0OhLEObMkJPmWMI-aHHjE3VsGv8z5-ZteGOfUvklBgvSbVYqm2TqjpEVv9P7DMZYmAGqj4NroqwB4YM6n1",
  },
  {
    id: 5,
    name: "Tharushi Mendis",
    idCode: "#DNR-8019",
    email: "tharushi.m@example.lk",
    phoneMasked: "076 ••• 1928",
    bloodGroup: "O-",
    isRare: true,
    district: "Colombo",
    hospital: "De Soysa Hosp.",
    lastDonation: "04 Nov 2024",
    eligibility: "Eligible Now",
    status: "Active",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtVCq96IsY9j_ogHzofjblseC6-MSwnzx5rd4aIXPy4OPtqVJxCrPqRkf9_A92gBCK4iHJ9ejThM8mCNCAYpFjEGC7VS6xs-emlKESttO_y8WjQq12pMhNjpYJvadaVxzyuIBkYPiAbJr5b0TfBkTZerxvqJDchKmpovzFIl0T68Ztk7i31xreUUKSzZnP-9yRbQA-rPYWxI5e1fMgFROhpatUGSzknXTqNAhErm1_",
  },
  {
    id: 6,
    name: "Priyantha Kumara",
    idCode: "#DNR-7992",
    email: "priyantha.k@example.lk",
    phoneMasked: "075 ••• 6601",
    bloodGroup: "B+",
    district: "Kurunegala",
    hospital: "TH Kurunegala",
    lastDonation: "10 Jan 2024",
    eligibility: "Medically Deferred",
    status: "Deactivated",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3312ZAQ7sCUKhbBR30hsatCs2Zgba02y4LUPaxEL29priurUKEHt984Vgy6gLir3v9B0s8WkQVXhT3C1F39b8BmZjfXPMSDdYZDymScKxqU9pB85qXe0Wcill-ovkPm4oCIc8PyPIw9SQIpIMg9a3SveeRFDSrKAnzPxHPaE_XaKKYIC3Gotsuur_AcPuJe13deZ3L7zOUZfrFU1qkO1IeQ_7Uk53BER3eRDz8fh2",
  },
];

export default function DonorManagement() {
  const { isDarkMode } = useApp();

  const [donors] = useState(initialDonorsList);
  const [selectedDonor, setSelectedDonor] = useState(initialDonorsList[0]);

  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("ALL");
  const [districtFilter, setDistrictFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredDonors = donors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.idCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.district.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBlood = bloodFilter === "ALL" || d.bloodGroup === bloodFilter;
    const matchesDistrict =
      districtFilter === "ALL" || d.district === districtFilter;
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;

    return matchesSearch && matchesBlood && matchesDistrict && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm("");
    setBloodFilter("ALL");
    setDistrictFilter("ALL");
    setStatusFilter("ALL");
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-between transition-colors antialiased ${
        isDarkMode
          ? "bg-[#0F172A] text-[#F8FAFC]"
          : "bg-[#f8f9ff] text-[#0b1c30]"
      }`}
    >
      <Navbar />

      <main className="w-full flex-1 pt-16 space-y-6 pb-12">
        <DonorHeader />
        <DonorMetrics />
        <DonorFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          bloodFilter={bloodFilter}
          setBloodFilter={setBloodFilter}
          districtFilter={districtFilter}
          setDistrictFilter={setDistrictFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onReset={handleResetFilters}
        />

        {/* Workspace Grid */}
        <div className="max-w-[1600px]l mx-auto px-6 lg:px-12 w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-8">
            <DonorTable
              donors={filteredDonors}
              selectedDonorId={selectedDonor?.id}
              onSelectDonor={setSelectedDonor}
            />
          </div>
          <div className="xl:col-span-4">
            <DonorProfileDrawer donor={selectedDonor} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
