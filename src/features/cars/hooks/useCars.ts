import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_CAR,
  GET_CARS,
} from "../api/cars.graphql";
import type {
  Car,
  CarFilters,
  CreateCarInput,
} from "../types/car";

type GetCarsData = {
  cars: Car[];
};

type GetCarsVariables = {
  model?: string;
  year?: number;
};

type CreateCarData = {
  createCar: Car;
};

type CreateCarVariables = {
  input: CreateCarInput;
};

export const useCars = (filters?: CarFilters) => {
  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery<GetCarsData, GetCarsVariables>(GET_CARS, {
    variables: {
      model: filters?.model || undefined,
      year: filters?.year,
    },
  });

  const [
    createCarMutation,
    {
      loading: creating,
      error: createError,
    },
  ] = useMutation<CreateCarData, CreateCarVariables>(CREATE_CAR, {
    onCompleted: () => {
      void refetch();
    },
  });

  const createCar = async (input: CreateCarInput) => {
    const result = await createCarMutation({
      variables: {
        input,
      },
    });

    return result.data?.createCar;
  };

  return {
    cars: data?.cars ?? [],
    loading,
    error,
    refetch,
    createCar,
    creating,
    createError,
  };
};