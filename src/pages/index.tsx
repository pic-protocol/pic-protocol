import type { ReactNode } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { HeroSection } from "../components/HeroSection";
import { TrioSection } from "../components/TrioSection";
import { SpecificationMapSection } from "../components/SpecificationMapSection";
import { ArticleScrollSection } from "../components/ArticleScrollSection";
import { SlackSection } from "../components/SlackSection";

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Provenance Identity Continuity"
    >
      <HeroSection />
      <TrioSection />
      <SpecificationMapSection />
      <div className="home-article-slack-band">
        <ArticleScrollSection />
        <SlackSection />
      </div>
    </Layout>
  );
}
