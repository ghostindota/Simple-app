import { useEffect, useState } from "react";
import userService, { User } from "../Services/user-service";
import { CanceledError } from "../Services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [errors, setErrors] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setErrors(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return {users, errors, isLoading, setUsers, setErrors};
};

export default useUsers;
