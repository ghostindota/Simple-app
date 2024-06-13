import "./index.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description must be at least 5 characters" }),
  amount: z
    .number({ invalid_type_error: "Amount field is required" })
    .min(20, { message: " Amount must be at least $5" }),
  category: z
    .string()
    .min(3, { message: "category must be at least 3 characters." }),
});

type FormData = z.infer<typeof schema>;

const Expense = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = (data: FormData) => console.log(data);
  return (
    <>
      <br />
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Groceries
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Utilities
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Entertainment
              </a>
            </li>
          </ul>
        </div>
        <br />
        <br />
        <button className="btn btn-primary" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Expense;
