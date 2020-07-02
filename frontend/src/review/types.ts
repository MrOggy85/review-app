export type Review = {
  readonly id: string;
  readonly date: string;
  readonly employeeId: string;
  readonly submitted: boolean;
  readonly assigneeIds: string[];
}
