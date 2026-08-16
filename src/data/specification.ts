import { load } from "js-yaml";
import specificationYaml from "./specification.yaml";

export type SpecDocument = {
  id: string;
  title: string;
  role: string;
  summary: string;
  html: string;
  text: string;
  xml: string;
  source: string;
};

export type SpecRelease = {
  version: string;
  label: string;
  status: string;
  profileId?: string;
  profilePath?: string;
  description: string;
  documents?: SpecDocument[];
  reference?: {
    label: string;
    url: string;
  };
};

type SpecData = {
  releases: SpecRelease[];
};

const compareVersions = (a: string, b: string) => {
  const left = a.split(".").map((part) => Number(part));
  const right = b.split(".").map((part) => Number(part));
  const length = Math.max(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    const diff = (left[index] ?? 0) - (right[index] ?? 0);
    if (diff !== 0) return diff;
  }

  return 0;
};

const parsed = load(specificationYaml) as SpecData;

export const SPEC_RELEASES = [...parsed.releases].sort((a, b) =>
  compareVersions(b.version, a.version)
);

export const CURRENT_SPEC_RELEASE = SPEC_RELEASES[0];

export const getReleaseStatusLabel = (release: SpecRelease) =>
  release.version === CURRENT_SPEC_RELEASE.version
    ? `${release.status} - current`
    : `${release.status} - superseded`;
