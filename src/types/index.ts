import type { LocalDateTime } from "@js-joda/core";

export interface NavItem {
  title: string;
  pathname: string;
}

export type MyMatter = {
  title: string;
  date: LocalDateTime;
};
