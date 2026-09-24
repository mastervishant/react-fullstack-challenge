import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query GetCars($model: String, $year: Int) {
    cars(model: $model, year: $year) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      color
      mobile
      tablet
      desktop
    }
  }
`;