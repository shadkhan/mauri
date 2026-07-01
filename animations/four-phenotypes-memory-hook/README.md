# Four Phenotypes Memory Hook

Reusable Manim Community Edition scene for a 25-30 second educational animation.

## Scene

`FourPhenotypesMemoryHook`

## Render With Docker

From the repository root in PowerShell:

```powershell
docker run --rm -it -v "${PWD}/animations/four-phenotypes-memory-hook:/manim" manimcommunity/manim manim -pqh four_phenotypes_memory_hook.py FourPhenotypesMemoryHook
```

For a 1920x1080 production render:

```powershell
docker run --rm -it -v "${PWD}/animations/four-phenotypes-memory-hook:/manim" manimcommunity/manim manim -p -r 1920,1080 four_phenotypes_memory_hook.py FourPhenotypesMemoryHook
```

Output will be written under:

```text
animations/four-phenotypes-memory-hook/media/
```
