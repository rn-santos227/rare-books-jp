import { FormEvent, useMemo, useState } from "react";

export type ReviewFormState = {
  reviewerName: string;
  rating: string;
  bodyText: string;
};
