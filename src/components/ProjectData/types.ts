import { JSX } from "react";

export interface ProjectDataProps {
  project: {
    name: string;
    progressPeriod: string;
    liveDemoUrl: string;
    testBlogUrl?: string;
    mobileLiveDemoUrl?: string;
    gitRepositoryUrl?: string | null;
  };
  technologyStack: {
    frontEnd: JSX.Element[];
    backEnd: JSX.Element[];
  };
  keyResponsibilities: {
    front: string;
    back: string;
  }[];
  mainFeatures: {
    title: string;
    icon: string;
    desc: string[];
  }[];
  troubleshootingAndSolutions?: () => JSX.Element;
}
