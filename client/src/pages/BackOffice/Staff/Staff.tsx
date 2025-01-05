import { useEffect, useState } from "react";
import StaffCard from "../../../components/StaffCard/StaffCard";
import EmptyPage from "../../../components/UI-components/EmptyPage/EmptyPage";
import ErrorMessage from "../../../components/UI-components/ErrorMessage/ErrorMessage";
import Loader from "../../../components/UI-components/Loader/Loader";
import "./Staff.css";
import SectionTitle from "../../../components/UI-components/SectionTitle/SectionTitle";

interface Staff {
  id: number;
  name: string;
  origin: string;
  image: string;
  favorite_type: string;
}

const Staff = () => {
  const [staff, setStaff] = useState<Staff[] | null>(null);

  useEffect(() => {
    fetch("http://localhost:3310/api/staff")
      .then((res) => res.json())
      .then((data) => setStaff(data))
      .catch((err) => {
        setStaff([]);
        console.error(err);
      });
  }, []);

  if (!staff) {
    return (
      <EmptyPage>
        <Loader />
      </EmptyPage>
    );
  }
  return (
    <>
      <SectionTitle
        title="Staff"
        description="Voici notre équipe de choc pour soigner vos Pokemons"
      />
      <section className="staff_section">
        {staff.length > 1 ? (
          staff.map((employee) => (
            <StaffCard staffData={employee} key={employee.id} />
          ))
        ) : (
          <EmptyPage>
            <ErrorMessage text="Un problème est survenu !" />
          </EmptyPage>
        )}
      </section>
    </>
  );
};

export default Staff;
