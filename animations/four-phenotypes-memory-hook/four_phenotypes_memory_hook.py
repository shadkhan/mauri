"""Four teaching phenotypes memory hook.

Render with Manim Community Edition:

    manim -pqh four_phenotypes_memory_hook.py FourPhenotypesMemoryHook

Docker example from the repository root:

    docker run --rm -it -v "%cd%/animations/four-phenotypes-memory-hook:/manim" manimcommunity/manim manim -pqh four_phenotypes_memory_hook.py FourPhenotypesMemoryHook
"""

from __future__ import annotations

from dataclasses import dataclass

from manim import *


@dataclass(frozen=True)
class PhenotypeCard:
    """Content and color metadata for one teaching phenotype."""

    name: str
    keywords: tuple[str, str, str]
    accent: ManimColor
    hair: ManimColor
    dress: ManimColor


class FourPhenotypesMemoryHook(Scene):
    """A warm 25-30 second memory hook for four PCOS teaching phenotypes."""

    def construct(self) -> None:
        self.camera.background_color = WHITE

        phenotypes = (
            PhenotypeCard(
                name="Mirror Phenotype",
                keywords=("Acne", "Facial Hair", "Delayed Periods"),
                accent=TEAL_C,
                hair="#3C2A25",
                dress="#E1F5EE",
            ),
            PhenotypeCard(
                name="Invisible Phenotype",
                keywords=("Hair Fall", "Low Energy", "Normal Ultrasound"),
                accent=PURPLE_C,
                hair="#4A342E",
                dress="#EEEDFE",
            ),
            PhenotypeCard(
                name="Silent Phenotype",
                keywords=("Regular Periods", "Weight Gain", "Skin Changes"),
                accent="#D4537E",
                hair="#51312B",
                dress="#FBEAF0",
            ),
            PhenotypeCard(
                name="Survival Phenotype",
                keywords=("Stress", "Missing Periods", "Mostly Normal Reports"),
                accent="#EF9F27",
                hair="#332B28",
                dress="#FAEEDA",
            ),
        )

        title = self.make_title("Four stories. Four patterns to remember.")
        women_row = self.make_women_row(phenotypes)

        self.play(FadeIn(title, shift=DOWN * 0.2), run_time=1.0)
        self.play(LaggedStartMap(FadeIn, women_row, shift=UP * 0.25, lag_ratio=0.12), run_time=1.6)
        self.wait(0.8)

        self.play(FadeOut(title, shift=UP * 0.15), run_time=0.5)

        # Introduce each phenotype individually with warm slide transitions.
        for index, phenotype in enumerate(phenotypes):
            focus_scene = self.make_focus_scene(phenotype, index + 1)
            self.play(
                women_row.animate.scale(0.62).to_edge(DOWN, buff=0.28).set_opacity(0.35),
                FadeIn(focus_scene, shift=LEFT * 0.35),
                run_time=0.8,
            )
            self.wait(1.6)
            self.play(FadeOut(focus_scene, shift=RIGHT * 0.35), run_time=0.55)

        self.play(FadeOut(women_row), run_time=0.5)

        grid_title = self.make_title("The four teaching phenotypes")
        grid = self.make_summary_grid(phenotypes)

        self.play(FadeIn(grid_title, shift=DOWN * 0.2), run_time=0.6)
        self.play(LaggedStartMap(FadeIn, grid, shift=UP * 0.25, lag_ratio=0.1), run_time=1.4)
        self.wait(3.0)

        question = Text(
            "Which story feels most like yours?",
            font_size=56,
            color="#085041",
            weight=BOLD,
        ).move_to(ORIGIN)
        soft_line = Text(
            "A starting point for understanding, not a diagnosis.",
            font_size=28,
            color="#888780",
        ).next_to(question, DOWN, buff=0.35)

        self.play(
            FadeOut(grid_title, shift=UP * 0.2),
            FadeOut(grid, shift=DOWN * 0.2),
            run_time=0.7,
        )
        self.play(FadeIn(question, scale=0.96), FadeIn(soft_line, shift=UP * 0.15), run_time=1.0)
        self.wait(2.2)

    def make_title(self, text: str) -> Text:
        """Create a consistent title."""

        return Text(text, font_size=46, color="#085041", weight=BOLD).to_edge(UP, buff=0.45)

    def make_women_row(self, phenotypes: tuple[PhenotypeCard, ...]) -> VGroup:
        """Create four minimal illustrated women side by side."""

        women = VGroup(
            *[
                self.make_woman(phenotype, scale=0.95)
                for phenotype in phenotypes
            ]
        ).arrange(RIGHT, buff=1.2)
        women.move_to(ORIGIN + DOWN * 0.1)
        return women

    def make_focus_scene(self, phenotype: PhenotypeCard, number: int) -> VGroup:
        """Create the individual phenotype introduction view."""

        woman = self.make_woman(phenotype, scale=1.25).shift(LEFT * 3.4 + DOWN * 0.25)

        badge = Circle(radius=0.32, color=phenotype.accent, fill_color=phenotype.accent, fill_opacity=1)
        badge_text = Text(str(number), font_size=28, color=WHITE, weight=BOLD).move_to(badge)
        badge_group = VGroup(badge, badge_text).next_to(woman, UP, buff=0.15)

        title = Text(phenotype.name, font_size=50, color="#085041", weight=BOLD)
        title.to_edge(UP, buff=1.25).shift(RIGHT * 2.4)

        keyword_rows = VGroup(
            *[
                self.make_keyword(keyword, phenotype.accent)
                for keyword in phenotype.keywords
            ]
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        keyword_rows.next_to(title, DOWN, buff=0.6).align_to(title, LEFT)

        return VGroup(woman, badge_group, title, keyword_rows)

    def make_summary_grid(self, phenotypes: tuple[PhenotypeCard, ...]) -> VGroup:
        """Create a 2x2 grid of phenotype cards."""

        cards = VGroup(
            *[
                self.make_summary_card(phenotype, index + 1)
                for index, phenotype in enumerate(phenotypes)
            ]
        )
        cards.arrange_in_grid(rows=2, cols=2, buff=(0.45, 0.35))
        cards.scale(0.92).shift(DOWN * 0.25)
        return cards

    def make_summary_card(self, phenotype: PhenotypeCard, number: int) -> VGroup:
        """Create one summary card for the final 2x2 grid."""

        card = RoundedRectangle(
            width=5.4,
            height=2.45,
            corner_radius=0.18,
            stroke_color="#D3D1C7",
            stroke_width=1.5,
            fill_color=WHITE,
            fill_opacity=1,
        )

        woman = self.make_woman(phenotype, scale=0.38).move_to(card.get_left() + RIGHT * 0.75)

        number_badge = Circle(
            radius=0.18,
            color=phenotype.accent,
            fill_color=phenotype.accent,
            fill_opacity=1,
        )
        number_text = Text(str(number), font_size=16, color=WHITE, weight=BOLD).move_to(number_badge)
        number_group = VGroup(number_badge, number_text).move_to(card.get_corner(UL) + RIGHT * 0.35 + DOWN * 0.35)

        title = Text(phenotype.name, font_size=26, color="#085041", weight=BOLD)
        title.move_to(card.get_top() + DOWN * 0.45 + RIGHT * 0.9).align_to(card.get_left() + RIGHT * 1.35, LEFT)

        keywords = VGroup(
            *[
                Text(f"• {keyword}", font_size=20, color="#2C2C2A")
                for keyword in phenotype.keywords
            ]
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        keywords.next_to(title, DOWN, buff=0.18).align_to(title, LEFT)

        return VGroup(card, woman, number_group, title, keywords)

    def make_keyword(self, text: str, accent: ManimColor) -> VGroup:
        """Create one large keyword row with a soft accent dot."""

        dot = Circle(radius=0.11, color=accent, fill_color=accent, fill_opacity=1)
        label = Text(text, font_size=34, color="#2C2C2A")
        return VGroup(dot, label).arrange(RIGHT, buff=0.22)

    def make_woman(self, phenotype: PhenotypeCard, scale: float = 1.0) -> VGroup:
        """Create a minimal warm illustrated woman using simple vector shapes."""

        head = Circle(
            radius=0.42,
            stroke_color="#7A5D52",
            stroke_width=2,
            fill_color="#F3C7A9",
            fill_opacity=1,
        )
        hair_back = ArcBetweenPoints(
            LEFT * 0.48 + UP * 0.12,
            RIGHT * 0.48 + UP * 0.12,
            angle=-PI,
            color=phenotype.hair,
            stroke_width=18,
        ).shift(UP * 0.18)
        hair_side_left = Arc(
            radius=0.48,
            start_angle=PI * 0.62,
            angle=PI * 0.85,
            color=phenotype.hair,
            stroke_width=11,
        ).shift(LEFT * 0.18 + DOWN * 0.04)
        hair_side_right = Arc(
            radius=0.48,
            start_angle=-PI * 0.47,
            angle=PI * 0.82,
            color=phenotype.hair,
            stroke_width=11,
        ).shift(RIGHT * 0.18 + DOWN * 0.04)

        body = RoundedRectangle(
            width=1.25,
            height=1.25,
            corner_radius=0.22,
            stroke_color=phenotype.accent,
            stroke_width=2,
            fill_color=phenotype.dress,
            fill_opacity=1,
        ).next_to(head, DOWN, buff=0.04)

        neck = Rectangle(
            width=0.2,
            height=0.18,
            stroke_width=0,
            fill_color="#F3C7A9",
            fill_opacity=1,
        ).move_to((head.get_bottom() + body.get_top()) / 2)

        eye_left = Dot(point=LEFT * 0.14 + UP * 0.04, radius=0.025, color="#2C2C2A")
        eye_right = Dot(point=RIGHT * 0.14 + UP * 0.04, radius=0.025, color="#2C2C2A")
        smile = Arc(
            radius=0.12,
            start_angle=PI * 1.12,
            angle=PI * 0.78,
            color="#7A5D52",
            stroke_width=2,
        ).shift(DOWN * 0.12)

        accent_pin = Circle(
            radius=0.08,
            stroke_width=0,
            fill_color=phenotype.accent,
            fill_opacity=1,
        ).move_to(body.get_top() + DOWN * 0.26 + RIGHT * 0.28)

        figure = VGroup(
            hair_back,
            hair_side_left,
            hair_side_right,
            neck,
            body,
            head,
            eye_left,
            eye_right,
            smile,
            accent_pin,
        )
        figure.scale(scale)
        return figure
