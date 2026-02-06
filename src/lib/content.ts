// Content loader with TypeScript types
// All content is managed via JSON files in /src/content

import siteConfig from "@/content/site.json";
import projectsConfig from "@/content/projects.json";
import runningConfig from "@/content/running.json";
import journeyConfig from "@/content/journey.json";
import skillsConfig from "@/content/skills.json";

// Type exports inferred from JSON structure
export type SiteConfig = typeof siteConfig;
export type ProjectsConfig = typeof projectsConfig;
export type RunningConfig = typeof runningConfig;
export type JourneyConfig = typeof journeyConfig;
export type SkillsConfig = typeof skillsConfig;

// Individual type exports for convenience
export type Project = ProjectsConfig["other"][number];
export type FeaturedProject = ProjectsConfig["featured"][number];
export type Race = RunningConfig["races"][number];
export type JourneyEntry = JourneyConfig["timeline"][number];
export type SkillCategory = SkillsConfig["categories"][number];
export type Tool = SkillsConfig["tools"][number];
export type Coordinates = { lat: number; lng: number } | null;

// Content getters
export function getSiteConfig(): SiteConfig {
  return siteConfig;
}

export function getProjects(): ProjectsConfig {
  return projectsConfig;
}

export function getFeaturedProjects(): FeaturedProject[] {
  return projectsConfig.featured;
}

export function getAllProjects(): Project[] {
  return projectsConfig.other;
}

export function getRunning(): RunningConfig {
  return runningConfig;
}

export function getFeaturedRaces(): Race[] {
  return runningConfig.races.filter((race) => race.featured);
}

export function getAllRaces(): Race[] {
  return runningConfig.races;
}

export function getJourney(): JourneyConfig {
  return journeyConfig;
}

export function getTimeline(): JourneyEntry[] {
  return journeyConfig.timeline;
}

export function getSkills(): SkillsConfig {
  return skillsConfig;
}

export function getSkillCategories(): SkillCategory[] {
  return skillsConfig.categories;
}

export function getTools(): Tool[] {
  return skillsConfig.tools;
}

// Helper to format coordinates as string
export function formatCoordinates(coords: Coordinates): string {
  if (!coords) return "Location Unknown";
  const latDir = coords.lat >= 0 ? "N" : "S";
  const lngDir = coords.lng >= 0 ? "E" : "W";
  return `${Math.abs(coords.lat).toFixed(4)}°${latDir}, ${Math.abs(coords.lng).toFixed(4)}°${lngDir}`;
}

// Helper to get location string with coordinates
export function getLocationWithCoords(location: {
  name: string;
  coordinates: Coordinates;
}): { name: string; coords: string } {
  return {
    name: location.name,
    coords: formatCoordinates(location.coordinates),
  };
}



