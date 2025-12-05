# Grid & Constraint Patterns

These focus on efficient uniqueness checks and spatial indexing in 2D structures.

#### 🔑 Constraint Tracking (Set Hashing)
* **Goal:** Validate **uniqueness or repetition** across multiple groups (like Rows, Columns, and Boxes).
* **Mechanism:** Use separate **Sets** to simultaneously track the taken values for each independent constraint.
* **Recognition:** Typical in **grid/board validation problems** where multiple rules must hold true across different slices of the data (e.g., Sudoku).

#### 🗺️ Coordinate Mapping & Grouping
* **Goal:** Translate continuous $R, C$ coordinates into a discrete group ID.
* **Mechanism:** Use **integer division** (e.g., $\lfloor R/3 \rfloor$) to determine which fixed block an element belongs to.
* **Recognition:** Essential for **grid problems** when the logic must analyze or group elements into **fixed-size chunks** or blocks that are not simply a row or a column.