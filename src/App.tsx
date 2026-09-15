import { lazy, Suspense } from "react";
import { MotionConfig } from "motion/react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./site/ScrollToTop";
import Home from "./pages/Home";

/** VITE_ROUTER=hash builds a relocatable preview (no server-side routing needed). */
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

const Apply = lazy(() => import("./pages/Apply"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Faq = lazy(() => import("./pages/Faq"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ApplicantPrivacy = lazy(() => import("./pages/ApplicantPrivacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => (
  <MotionConfig reducedMotion="user">
    <Router>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/applicant-privacy" element={<ApplicantPrivacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  </MotionConfig>
);

export default App;
