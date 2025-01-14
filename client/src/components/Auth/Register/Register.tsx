import "./Register.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const allPokemonTypes = [
  { id: 2, type: "Feu" },
  { id: 3, type: "Plante" },
  { id: 4, type: "Électrik" },
  { id: 5, type: "Normal" },
  { id: 6, type: "Vol" },
  { id: 7, type: "Poison" },
  { id: 8, type: "Insecte" },
  { id: 9, type: "Sol" },
  { id: 10, type: "Roche" },
  { id: 11, type: "Acier" },
  { id: 12, type: "Psy" },
  { id: 13, type: "Ténèbres" },
  { id: 14, type: "Spectre" },
  { id: 15, type: "Glace" },
  { id: 16, type: "Dragon" },
  { id: 17, type: "Fée" },
];

const zodPokemonType: [string, ...string[]] = ["Eau"];
allPokemonTypes.map((pokemonType) => {
  zodPokemonType.push(pokemonType.type);
});

const passworRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d.*\d)[A-Za-z\d]{7,}$/;
// cette regex verifie que le password contient bien majuscules, minuscules, chiffres, le tout dans au moins 7 caractères

const SignUpSchema = z.object({
  email: z.string().email({
    message: "Le format du mail n'est pas valide",
  }),
  password: z.string().regex(passworRegex, {
    message:
      "Votre mot de passe doit contenir au moins 7 caractètes et inclures des majuscules, minuscule et des chiffres",
  }),
  name: z
    .string()
    .min(2, {
      message: "Le nom doit faire au minimum 2 caractères",
    })
    .max(30, {
      message: "Le nom doit faire au maximum 30 caractères",
    }),
  origin: z
    .string()
    .min(2, {
      message: "La ville d'origine doit faire au minimum 2 caractères",
    })
    .max(30, {
      message: "La ville d'origine doit faire au maximum 30 caractères",
    }),
  favorite_type: z.enum(zodPokemonType, {
    message: "Vous devez selectionner un type parmi la liste",
  }),
});
type SignUpSchemaType = z.infer<typeof SignUpSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  const onSubmit: SubmitHandler<SignUpSchemaType> = (data) => {
    console.info(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register_form">
      <label htmlFor="email">Adresse email</label>
      <input type="email" placeholder="email" {...register("email")} />
      {errors.email && <p className="error_register">{errors.email.message}</p>}

      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        placeholder="mot de passe"
        {...register("password")}
      />
      {errors.password && (
        <p className="error_register">{errors.password.message}</p>
      )}

      <label htmlFor="name">Nom</label>
      <input type="text" {...register("name")} />
      {errors.name && <p className="error_register">{errors.name.message}</p>}

      <label htmlFor="origin">Ville d'origine</label>
      <input type="text" {...register("origin")} />
      {errors.origin && (
        <p className="error_register">{errors.origin.message}</p>
      )}

      <label htmlFor="favorite_type">Votre type favoris</label>
      <select {...register("favorite_type")}>
        <option value={undefined}>-- Veuillez selectionner --</option>
        {allPokemonTypes.map((type) => (
          <option key={type.id} value={type.type}>
            {type.type}
          </option>
        ))}
      </select>
      {errors.favorite_type && (
        <p className="error_register">{errors.favorite_type.message}</p>
      )}

      <input type="submit" value={"Créer mon compte"} />
    </form>
  );
};

export default Register;
