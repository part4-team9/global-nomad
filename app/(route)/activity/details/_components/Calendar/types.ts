export interface Schedule {
  date: string;
  endTime: string;
  id: number;
  startTime: string;
}

export interface ActivityData {
  id: number;
  price: number;
  schedules: Schedule[];
  title: string;
}
