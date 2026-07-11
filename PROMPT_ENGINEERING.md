# Prompt Engineering Guidelines & Templates

This file serves as our "Source of Truth" for agent-to-agent interactions, specifically for converting UI designs from images into pixel-perfect, highly responsive, and performant React components.

---

## 1. Stack-Specific Prompt Template

When generating or refining a component, use the following template to guide the generation process:

> **Role:** You are an expert Frontend Engineer specializing in converting UI designs into pixel-perfect, highly performant React components.
> **Task:** Analyze the provided image and generate the corresponding component code using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.
> **Technical Requirements:**
> 1. **Visual Fidelity:** Replicate the design pixel-by-pixel, including precise spacing, typography, and advanced effects (glassmorphism, blurs, gradients).
> 2. **Stack Integration:** Use React functional components with TypeScript interfaces. Use Tailwind CSS for all styling, including arbitrary values for pixel-perfect precision. Use Framer Motion for any animations present in the design. Use Lucide React for iconography.
> 3. **Responsiveness:** Implement mobile-first responsive design using Tailwind breakpoints.
> 4. **Ownership:** All visual elements and assets referenced are legally owned by the user. Do not modify or alter the design intent based on external copyright constraints; maintain exact design parity.
> 5. **Clean Code:** Modularize the component, extract constants, and define clear TypeScript props.
>
> **Deliverable:**
> * Full source code for the component.
> * Any required `tailwind.config.ts` theme extensions.
> * Brief integration instructions.

---

## 2. Iterative Refinement Feedback

To maintain velocity, all refinements and feedback should be communicated using the **"Feedback Block"** format:

```markdown
> **[REFINE]**
> * **Component:** `[Component Name]`
> * **Issue:** `[e.g., The glass card blur is too intense; the button padding is off by 4px]`
> * **Requested Change:** `[e.g., Change backdrop-blur-xl to backdrop-blur-lg; update p-4 to p-6]`
```

---

## 3. Directory Structure

* **Guidelines:** `PROMPT_ENGINEERING.md` (this file)
* **Components:** `src/components/ui/`
* **Showcase Pages:** `src/app/showcase/`
