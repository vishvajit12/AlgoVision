  /* ──────────────────────────────────────────────────────────────
    SOLUTION_STEPS — shown ABOVE the animation block
    Each entry: { title, approach, steps[] }
  ────────────────────────────────────────────────────────────── */
  export const SOLUTION_STEPS = {
  1: {
    title: 'One-Pass Hash Map',
    approach:
      'Walk the array once. At each index i, compute complement = target - nums[i] — the value we\'d need somewhere else in the array to reach target. Check if that complement was already seen (stored earlier in the hash map). If yes, we found our pair instantly. If no, store nums[i] itself in the map (value → index) so a future element can find it as its complement. This avoids ever needing a nested loop.',
    steps: [
      { num:1, icon:'🗺️', title:'Initialize Hash Map', desc:'Create an empty map to store value → index pairs seen so far.' },
      { num:2, icon:'🔄', title:'Iterate the Array',    desc:'Loop through each element nums[i], one index at a time.' },
      { num:3, icon:'🧮', title:'Compute Complement',   desc:'complement = target - nums[i] — the exact value we need to find.' },
      { num:4, icon:'🔍', title:'Check Map for Complement', desc:'If complement exists in the map → we found our pair! Return [map[complement], i].' },
      { num:5, icon:'💾', title:'Store Current Value',  desc:'Otherwise, store nums[i] → i in the map and move to the next index.' },
    ],
  },
    2: {
      title: 'Binary Search (Divide & Conquer)',
      approach:
        'Since the array is sorted, maintain low and high boundary pointers and repeatedly halve the search space by comparing the middle element to the target.',
      steps: [
        { num:1, icon:'📍', title:'Set Boundary Pointers',    desc:'Initialize lo = 0, hi = n − 1.' },
        { num:2, icon:'➗', title:'Calculate Midpoint',        desc:'mid = lo + (hi − lo) / 2  (integer division; avoids overflow).' },
        { num:3, icon:'🎯', title:'Compare Middle Element',   desc:'If nums[mid] == target → found! Return mid.' },
        { num:4, icon:'➡️', title:'Search Right Half',        desc:'If nums[mid] < target → lo = mid + 1  (discard left half).' },
        { num:5, icon:'⬅️', title:'Search Left Half',         desc:'If nums[mid] > target → hi = mid − 1  (discard right half).' },
        { num:6, icon:'❌', title:'Target Not Found',          desc:'If lo > hi, the search space is empty. Return −1.' },
      ],
    },
    3: {
    title: 'Stack-Based Bracket Matching',
    approach:
      'Scan the string left to right. Every opening bracket gets pushed onto a stack. Every closing bracket must match the stack top exactly — if the stack is empty (nothing to close) or the top is the wrong type, the string is invalid immediately. After scanning, the string is valid only if the stack is completely empty (every opener found its closer).',
    steps: [
      { num:1, icon:'👀', title:'Scan Character', desc:'Look at the current character in the string, one at a time.' },
      { num:2, icon:'📥', title:'Push Opener',     desc:'If it\'s an opening bracket ( { [ → push it onto the stack.' },
      { num:3, icon:'🔍', title:'Peek on Closer',  desc:'If it\'s a closer ) } ] → peek the stack top to check for a match.' },
      { num:4, icon:'📤', title:'Pop on Match',     desc:'If types match, pop the stack. If not (or stack is empty) → invalid immediately.' },
      { num:5, icon:'⚖️', title:'Final Check',      desc:'After the scan, valid only if the stack ended up completely empty.' },
    ],
  },
    4: {
    title: 'Sliding Window + Hash Map',
    approach:
      'Expand a window with a right pointer, tracking the last index each character was seen. If the current character was already seen inside the current window, jump the left pointer past that old occurrence. Track the max window size seen so far.',
    steps: [
      { num:1, icon:'🪟', title:'Initialize Window', desc:'left = 0, maxLen = 0, and an empty map of char → last seen index.' },
      { num:2, icon:'➡️', title:'Expand Right',       desc:'Move right pointer one char at a time through the string.' },
      { num:3, icon:'🔍', title:'Check for Repeat',   desc:'If current char was seen at index >= left, it\'s inside our current window.' },
      { num:4, icon:'⬅️', title:'Shrink Left',         desc:'Jump left to (last seen index + 1) to drop the duplicate out of the window.' },
      { num:5, icon:'💾', title:'Update Map & Max',    desc:'Record char\'s new last-seen index, then update maxLen = max(maxLen, right-left+1).' },
    ],
  },
  5: {
    title: 'Two-Pass: Count Length → Locate → Unlink',
    approach:
      'First pass: walk the whole list once to get its length. Compute position = length - n + 1 (the 1-indexed node to remove, counted from the head). If position is 1, the head itself is the target — just move head forward. Otherwise, walk prev forward (position - 2) times so it lands just before the target, then unlink delNode by pointing prev->next past it.',
    steps: [
      { num:1, icon:'📏', title:'Pass 1 — Measure Length', desc:'Walk temp from head to nullptr, counting nodes. This gives total length.' },
      { num:2, icon:'🧮', title:'Compute Target Position', desc:'position = length - n + 1 → the 1-indexed node (from head) we must remove.' },
      { num:3, icon:'🎯', title:'Special Case: Head', desc:'If position == 1, the head itself is the target — just do head = head->next.' },
      { num:4, icon:'🚶', title:'Walk prev to Target-1',  desc:'Otherwise, move prev forward until it sits just before the target node.' },
      { num:5, icon:'✂️', title:'Unlink the Node',         desc:'delNode = prev->next. Set prev->next = delNode->next — node is skipped over.' },
    ],
  },
  6: {
    title: 'Stack-Based Comparison',
    approach:
      'Pass 1: walk the whole list once, pushing every value onto a stack — this naturally reverses the order (LIFO). Pass 2: walk the list again from head, and for each node, compare its value against the stack top, then pop. Since the stack unwinds in reverse, comparing head-forward against stack-pops is exactly comparing the list against its own reverse. Any mismatch means it is not a palindrome; if curr exhausts with no mismatch, it is.',
    steps: [
      { num:1, icon:'📥', title:'Pass 1 — Push Everything', desc:'Traverse from head to nullptr, pushing every node value onto a stack.' },
      { num:2, icon:'🔁', title:'Stack Now Holds Reverse',  desc:'Because of LIFO order, the stack top-to-bottom reads the list in reverse.' },
      { num:3, icon:'👀', title:'Pass 2 — Peek & Compare',  desc:'Walk curr from head again. At each node, compare curr->val with stack top.' },
      { num:4, icon:'📤', title:'Pop on Match',              desc:'If values match, pop the stack and advance curr. Keep going.' },
      { num:5, icon:'⚖️', title:'Decide the Result',         desc:'Any mismatch → return false immediately. curr reaches nullptr → return true.' },
    ],
  },
  7: {
    title: "Floyd's Tortoise and Hare",
    approach:
      'Use two pointers starting at head — slow moves one node per step, fast moves two nodes per step. If there is no cycle, fast will reach nullptr first (it\'s faster, so it exits the list quicker) and we return false. If there IS a cycle, fast keeps looping inside it and, because it closes the gap on slow by 1 node every step, it is mathematically guaranteed to eventually land on the exact same node as slow — at that instant we return true. No extra memory needed, unlike a hash-set approach.',
    steps: [
      { num:1, icon:'🐢', title:'Init Both Pointers', desc:'slow = head, fast = head. Both start at the same node.' },
      { num:2, icon:'🔁', title:'Move at Different Speeds', desc:'Each iteration: slow moves 1 node, fast moves 2 nodes.' },
      { num:3, icon:'🚧', title:'Check for End of List', desc:'If fast or fast->next becomes nullptr, there\'s no cycle — exit and return false.' },
      { num:4, icon:'🎯', title:'Check for Collision',  desc:'If slow == fast (same node), the pointers met inside a cycle → return true.' },
      { num:5, icon:'♾️', title:'Guaranteed Meeting',    desc:'Inside a cycle, fast gains 1 node on slow every step — they must eventually collide.' },
    ],
  },
  8: {
    title: 'Greedy — Track Min Buy, Max Profit',
    approach:
      'Walk the array once, keeping two running values: Best_buy (the lowest price seen so far) and max_profit (the best profit found so far). At each day, first check if selling today (prices[i] - Best_buy) beats our current max_profit — check BEFORE updating Best_buy, since you can only sell after you\'ve already bought. Then update Best_buy to the lower of itself and today\'s price, so future days always buy at the cheapest point seen so far.',
    steps: [
      { num:1, icon:'🏁', title:'Initialize',          desc:'max_profit = 0. Best_buy = prices[0] — assume we bought on day 0.' },
      { num:2, icon:'📅', title:'Visit Each Day',       desc:'Loop i from 1 to end. Look at today\'s price, prices[i].' },
      { num:3, icon:'💰', title:'Check Profit First',   desc:'If prices[i] > Best_buy, selling today would profit. Compare against max_profit.' },
      { num:4, icon:'📉', title:'Update Best Buy',       desc:'Best_buy = min(Best_buy, prices[i]) — always remember the cheapest day so far.' },
      { num:5, icon:'🏆', title:'Return max_profit',    desc:'After the scan, max_profit holds the best possible single buy→sell profit.' },
    ],
  },


  10: {
    title: 'Merge From the Back — Three Pointers',
    approach:
      'Instead of merging from the front (which would overwrite unread elements in nums1), work backwards. i points at the last real element of nums1, j points at the last element of nums2, k points at the last empty slot in nums1 (which is also the final array\'s last index). At each step, place the larger of nums1[i] and nums2[j] into nums1[k], then move that source pointer and k backward. Once nums2 is fully placed (j < 0), we\'re done — any remaining nums1 elements are already in their correct spot and need no copying.',
    steps: [
      { num:1, icon:'🎯', title:'Init Three Pointers', desc:'i = m-1 (nums1 last real value). j = n-1 (nums2 last value). k = m+n-1 (last slot, to be filled).' },
      { num:2, icon:'⚖️', title:'Compare Back Elements', desc:'While i≥0 and j≥0: compare nums1[i] vs nums2[j] — whichever is bigger belongs in the last slot.' },
      { num:3, icon:'✍️', title:'Write the Larger Value', desc:'Place the winner into nums1[k], then decrement that source pointer (i or j) and k.' },
      { num:4, icon:'🔁', title:'Repeat Until One Runs Out', desc:'Keep comparing and writing until either i or j goes below 0.' },
      { num:5, icon:'📋', title:'Copy Leftover nums2',  desc:'If j is still ≥0 after the main loop, nums2 still has smaller leftover values — copy them directly (nums1\'s own remaining values are already correctly placed).' },
    ],
  },



  11: {
    title: 'Copy-Ahead Trick — No Head Access',
    approach:
      'We can\'t unlink `node` itself since we have no pointer to whatever comes before it. Instead, we cheat: copy node->next\'s value into node, so node now "becomes" its neighbor in value. Then physically delete node->next (which we DO have a pointer to) and re-link node->next to skip over it. The end result looks identical to deleting the original node — we just deleted the wrong memory address and disguised it with a value copy.',
    steps: [
      { num:1, icon:'🚫', title:'No Head Access',    desc:'We\'re only given `node` — not head. We physically cannot unlink node from whatever points to it.' },
      { num:2, icon:'👀', title:'Peek node->next',    desc:'Look at node->next->val — the value of the node right after us.' },
      { num:3, icon:'📋', title:'Copy Value Forward', desc:'node->val = node->next->val — node now holds its neighbor\'s value.' },
      { num:4, icon:'🎯', title:'Save & Skip',         desc:'temp = node->next, then node->next = node->next->next — unlink the NEXT node instead.' },
      { num:5, icon:'🗑️', title:'Delete the Neighbor', desc:'delete temp — we deleted node->next\'s memory, but visually it looks like node vanished.' },
    ],
  },
  12: {
    title: 'Iterative Stack — Left, Visit, Right',
    approach:
      'Instead of recursion, simulate the call stack manually. Keep pushing left children onto a stack, going as deep-left as possible. When you can\'t go left anymore, that means the stack top is the next node to actually visit in order — pop it, record its value, then move to its right child and repeat the whole process from there. This naturally produces left → root → right ordering for every subtree.',
    steps: [
      { num:1, icon:'⬅️', title:'Go Left, Pushing',    desc:'From curr, keep pushing curr onto the stack and moving curr = curr->left until curr is null.' },
      { num:2, icon:'📤', title:'Pop & Visit',          desc:'When curr is null, pop the stack top — that node is next in inorder sequence. Add its value to result.' },
      { num:3, icon:'➡️', title:'Move Right',            desc:'Set curr = poppedNode->right — now explore that node\'s right subtree the same way.' },
      { num:4, icon:'🔁', title:'Repeat',                desc:'Loop back to step 1: go left as far as possible from the new curr, pushing along the way.' },
      { num:5, icon:'🏁', title:'Done When Both Empty',  desc:'Stop when curr is null AND the stack is empty — every node has been visited.' },
    ],
  },
  13: {
    title: 'Direct Index Lookup',
    approach:
      'Chef calls the 7th letter "lucky" — but programming indices start at 0, so the 7th character (counting 1,2,3...) sits at index 6, not index 7. Read the string, then simply print s[6]. No loop, no traversal — this is pure 1-indexed-to-0-indexed translation.',
    steps: [
      { num:1, icon:'📥', title:'Read the String',    desc:'Take input string S of length 10.' },
      { num:2, icon:'🔢', title:'Count to the 7th Letter', desc:'1st→idx 0, 2nd→idx 1, ... 7th→idx 6. The "7th" position is always one less than 7 in 0-indexing.' },
      { num:3, icon:'🎯', title:'Access Index 6',      desc:'s[6] directly grabs the 7th character — no loop needed.' },
      { num:4, icon:'🖨️', title:'Print It',            desc:'Output that single character as the answer.' },
    ],
  },
  14: {
    title: 'Two Pointers — Shrink From the Shorter Wall',
    approach:
      'Start with the widest possible container: fst at index 0, sec at the last index. Compute its area as min(height[fst], height[sec]) * width — the container can only hold water up to the SHORTER wall, since water spills over the shorter side. Track the best area seen. Then comes the key insight: moving the TALLER pointer inward can only shrink width while keeping the same (or a worse) height cap, so it never helps. Moving the SHORTER pointer inward is the only move that could possibly find a taller wall and increase area, even though width shrinks. So always discard the shorter wall and move that pointer inward.',
    steps: [
      { num:1, icon:'🎯', title:'Start Widest',        desc:'fst = 0, sec = last index. This is the maximum possible width.' },
      { num:2, icon:'📐', title:'Compute Area',          desc:'area = min(height[fst], height[sec]) * (sec - fst). Height is capped by the SHORTER wall.' },
      { num:3, icon:'🏆', title:'Track Best',            desc:'marea = max(marea, area) — keep the best area found so far.' },
      { num:4, icon:'📉', title:'Discard the Shorter Wall', desc:'The shorter wall is the bottleneck — moving the taller one can never help. Move whichever pointer is shorter, inward.' },
      { num:5, icon:'🔁', title:'Repeat Until Pointers Meet', desc:'Continue until fst and sec cross. marea holds the answer.' },
    ],
  },
  15: {
    title: 'Split → Reverse → Join',
    approach:
      'Rather than manually walking indices to skip spaces, extract words using whitespace-aware splitting (s.split() in Python, or stream extraction ">>" in C++) — both automatically treat any run of one or more spaces as a single separator and ignore leading/trailing spaces. This gives a clean array of just the words, with no empty strings. Reverse that array, then join the words back together with exactly one space between each — never at the start or end.',
    steps: [
      { num:1, icon:'✂️', title:'Split on Whitespace',  desc:'Extract words, automatically skipping leading/trailing/multiple spaces. Empty tokens are never produced.' },
      { num:2, icon:'📋', title:'Collect into Array',    desc:'Each extracted word gets pushed into a words array, in original left-to-right order.' },
      { num:3, icon:'🔄', title:'Reverse the Array',      desc:'Reverse the words array in place — last word becomes first.' },
      { num:4, icon:'🔗', title:'Join with Single Space', desc:'Concatenate all words with exactly one space between consecutive words — none at the start or end.' },
      { num:5, icon:'🏁', title:'Return Result',          desc:'The final string is the answer — clean, single-spaced, word order reversed.' },
    ],
  },

  9: {
    title: 'Hash Set Lookup',
    approach:
      'Insert each element into a hash set. Before inserting, check if it already exists — if yes, a duplicate is found. One-pass O(n) solution.',
    steps: [
      { num:1, icon:'🗺️', title:'Initialize Hash Set',   desc:'Create an empty set to track seen values.' },
      { num:2, icon:'🔄', title:'Iterate the Array',      desc:'Loop through each element nums[i].' },
      { num:3, icon:'🔍', title:'Check Set for Duplicate',desc:'If nums[i] already exists in the set → return true immediately.' },
      { num:4, icon:'💾', title:'Insert Current Value',   desc:'Otherwise, add nums[i] to the set and continue.' },
      { num:5, icon:'❌', title:'No Duplicate Found',     desc:'If the loop finishes with no match → return false.' },
    ],
  },
  16: {
    title: 'Stack Builder with Suffix Check',
    approach:
      'Build the result character by character using a stack. After EVERY push, check whether the last part.length characters on the stack exactly match part. If they do, that means we just completed an occurrence of part sitting right at the top — pop all of those characters off immediately. Since removals always happen at the top the instant a match completes, this correctly handles cascading matches (removing one occurrence can expose an earlier partial match, which the very next push may complete).',
    steps: [
      { num:1, icon:'📥', title:'Push Character',      desc:'Take the next character from s and push it onto the stack.' },
      { num:2, icon:'👀', title:'Peek Last k Characters', desc:'Look at the top part.length characters of the stack (k = part.length).' },
      { num:3, icon:'🔍', title:'Compare to part',      desc:'Does that suffix exactly equal part?' },
      { num:4, icon:'✂️', title:'Pop on Match',          desc:'If yes, pop all k characters off — that occurrence is erased.' },
      { num:5, icon:'🏁', title:'Return the Stack',      desc:'After processing every character, whatever remains on the stack (bottom to top) is the final answer.' },
    ],
  },
  17: {
    title: 'Iterative Stack — Visit First, Push Right Then Left',
    approach:
      'Unlike inorder (which goes all the way left before visiting anything), preorder visits a node the MOMENT it\'s popped — before looking at its children at all. Push root. Then repeatedly: pop the top node, record its value immediately, then push its right child first and its left child second. Pushing right before left means left ends up on top of the stack, so it gets popped (and visited) next — correctly producing root → left → right order for every subtree.',
    steps: [
      { num:1, icon:'📥', title:'Push Root',           desc:'If root exists, push it onto the stack. If root is null, return empty result immediately.' },
      { num:2, icon:'📤', title:'Pop & Visit Immediately', desc:'Pop the stack top and record its value into result RIGHT AWAY — before touching its children.' },
      { num:3, icon:'➡️', title:'Push Right Child',      desc:'If the popped node has a right child, push it — but don\'t visit it yet.' },
      { num:4, icon:'⬅️', title:'Push Left Child',        desc:'If the popped node has a left child, push it LAST — so it sits on top and gets processed next.' },
      { num:5, icon:'🏁', title:'Repeat Until Empty',     desc:'Loop back to step 2. Stop when the stack is empty — every node has been visited.' },
    ],
  },
  18: {
    title: "Boyer-Moore Voting Algorithm",
    approach:
      'Think of it as an election with one running "candidate" and a vote count. Walk through nums once. Whenever count hits 0, we have no current champion — so crown whatever number we\'re looking at right now as the new candidate. Then cast a vote: if the current number matches the candidate, count++ (a supporting vote); if it doesn\'t match, count-- (an opposing vote). Because the majority element appears more than n/2 times, it can never be permanently voted out — even if it loses ground temporarily to a mix of other numbers, it always has enough "votes" in the full array to end up as the final surviving candidate.',
    steps: [
      { num:1, icon:'🏁', title:'Init candidate & count', desc:'candidate = 0, count = 0. No one is running yet.' },
      { num:2, icon:'👑', title:'Crown on count == 0',    desc:'If count is 0, the current number becomes the new candidate — a fresh start.' },
      { num:3, icon:'✅', title:'Matching Vote',           desc:'If num == candidate, count++ — this number supports the current candidate.' },
      { num:4, icon:'❌', title:'Opposing Vote',            desc:'If num != candidate, count-- — this number opposes the current candidate.' },
      { num:5, icon:'🏆', title:'Return the Survivor',      desc:'After the full scan, whichever candidate is still standing is guaranteed to be the majority element.' },
    ],
  },
  19: {
    title: 'Two Biased Binary Searches',
    approach:
      'A normal binary search stops the instant it finds a match. Here we need the boundary, so we do the opposite: even after finding target at mid, we KEEP searching in one direction. For findFirst, on a match we record it as a candidate answer but shrink high = mid - 1, forcing the search leftward to look for an even earlier occurrence. For findLast, on a match we shrink low = mid + 1, forcing the search rightward to look for a later occurrence. Run both searches independently and combine their results into [first, last].',
    steps: [
      { num:1, icon:'⬅️', title:'findFirst — Bias Left',  desc:'On a match, save it as the current best answer, then keep searching the LEFT half (high = mid-1) for an even earlier match.' },
      { num:2, icon:'➡️', title:'findLast — Bias Right',  desc:'On a match, save it as the current best answer, then keep searching the RIGHT half (low = mid+1) for an even later match.' },
      { num:3, icon:'🔍', title:'Standard Narrowing',      desc:'If nums[mid] < target, search right (low = mid+1). If nums[mid] > target, search left (high = mid-1) — same as regular binary search.' },
      { num:4, icon:'🏁', title:'Loop Until low > high',   desc:'Each search ends when the window closes. Whatever ans was last saved (or -1 if never) is that search\'s result.' },
      { num:5, icon:'📦', title:'Combine Results',          desc:'searchRange returns [findFirst result, findLast result] — together forming the target\'s full boundary.' },
    ],
  },
  20: {
    title: 'Monotonic Stack + Last-Occurrence Lookahead',
    approach:
      'First, record the LAST index at which every letter appears — this tells us "does this letter come back later?" Then build a stack greedily. For each character: if it\'s already somewhere in the stack, skip it entirely (we only ever want ONE of each letter). Otherwise, before pushing, keep popping the stack\'s top WHILE the top is alphabetically larger than the current character AND that top letter reappears later in the string (checked via the last-occurrence table). Popping is safe only because we know we can pick that letter back up later — if it never reappears, we must keep it even if it\'s "out of order." Finally push the current character.',
    steps: [
      { num:1, icon:'📇', title:'Record Last Occurrence',  desc:'Scan the whole string once, recording the last index each letter appears at.' },
      { num:2, icon:'⏭️', title:'Skip If Already Placed',   desc:'If the current character is already in the stack, skip it — we never want two of the same letter.' },
      { num:3, icon:'🔍', title:'Check: Can We Pop?',        desc:'While the stack top is alphabetically bigger AND reappears later (lastIndex[top] > i), it\'s safe to pop.' },
      { num:4, icon:'✂️', title:'Pop the Bigger, Later Letter', desc:'Popping now and re-adding it later gives a smaller (better) result — remove it from the "in stack" tracking too.' },
      { num:5, icon:'📥', title:'Push Current Character',    desc:'Once no more valid pops are possible, push the current character and mark it as placed.' },
    ],
  },
  21: {
    title: 'DFS + Hash Map to Handle Cycles',
    approach:
      'The graph is undirected and connected, meaning it almost certainly contains cycles — a naive recursive copy would loop forever bouncing between neighbors. The fix: keep a hash map from ORIGINAL node → its CLONE. Before doing any work, check if the current node is already in the map — if so, we\'ve been here before, so just return the existing clone instead of recursing again. Otherwise, create the clone, register it in the map IMMEDIATELY (before recursing into neighbors — this is what breaks the cycle), then recursively clone each neighbor and attach it to the new node\'s neighbor list.',
    steps: [
      { num:1, icon:'🔍', title:'Check the Map First',   desc:'If this original node already has a clone in the map, return that clone immediately — do not create a duplicate.' },
      { num:2, icon:'🆕', title:'Create & Register',       desc:'Otherwise, create a new node with the same value, and IMMEDIATELY store it in the map before touching neighbors — this is the cycle-breaker.' },
      { num:3, icon:'🔄', title:'Recurse on Neighbors',     desc:'For each neighbor in the original node\'s list, recursively clone it (which may itself hit the map-check and return instantly).' },
      { num:4, icon:'🔗', title:'Link the Clone',            desc:'Attach each recursively-cloned neighbor to the current copy\'s neighbor list.' },
      { num:5, icon:'🏁', title:'Return the Clone',          desc:'Once all neighbors are linked, return this node\'s copy back up the call stack.' },
    ],
  },
  22: {
    title: 'Recursive DFS — Compare Node by Node',
    approach:
      'Compare two trees simultaneously, node by node, using recursion. At each pair of nodes: if BOTH are null, they match at this position (two matching empty branches) — return true. If only ONE is null, the trees have different shapes here — return false immediately. If both exist but their values differ — return false immediately. Otherwise, values match at this pair, so recursively check BOTH the left subtrees and the right subtrees — the trees are only the same if both of those recursive checks also return true.',
    steps: [
      { num:1, icon:'🟰', title:'Both Null → Match',      desc:'If both current nodes are null, this branch matches (two empty ends) — return true.' },
      { num:2, icon:'❌', title:'One Null → Mismatch',    desc:'If only one of the two nodes is null, the shapes differ here — return false immediately.' },
      { num:3, icon:'🔍', title:'Compare Values',          desc:'If both nodes exist, check p->val == q->val. Different values → return false immediately.' },
      { num:4, icon:'⬅️', title:'Recurse Left',            desc:'Values matched — recursively check isSameTree(p->left, q->left).' },
      { num:5, icon:'➡️', title:'Recurse Right & Combine', desc:'Recursively check isSameTree(p->right, q->right). Both left AND right must be true for this pair to be "same".' },
    ],
  },
  23: {
    title: 'Binary Search on the Answer',
    approach:
      'Instead of searching an array, binary search over the RANGE OF POSSIBLE ANSWERS (1 to x) for the largest integer whose square doesn\'t exceed x. At each mid, compute mid*mid. If it exactly equals x, we found a perfect square root — return immediately. If mid*mid is LESS than x, mid is a valid (but possibly not optimal) answer — save it in ans, then search the right half for something bigger. If mid*mid is GREATER than x, mid is too big — search the left half. Since x might not have an exact integer square root, ans holds the best (largest valid) candidate found so far, which becomes the final floor(√x) once the search window closes.',
    steps: [
      { num:1, icon:'🎯', title:'Handle 0 and 1',        desc:'Special case: sqrt(0)=0 and sqrt(1)=1 — return immediately, no search needed.' },
      { num:2, icon:'📐', title:'Search Range [1, x]',    desc:'low=1, high=x, ans=0. The true answer must be somewhere in this range.' },
      { num:3, icon:'✖️', title:'Compute mid × mid',       desc:'At each step, compute mid*mid and compare it against x.' },
      { num:4, icon:'💾', title:'Save & Search Right',     desc:'If mid*mid < x, mid COULD be the answer — save it in ans, then search right (low=mid+1) for something even bigger.' },
      { num:5, icon:'🏁', title:'Return Saved ans',        desc:'If mid*mid > x, search left. When the loop ends, ans holds the largest mid whose square never exceeded x — that\'s floor(√x).' },
    ],
  },
  24: {
    title: 'Divide and Conquer — Middle Element as Root',
    approach:
      'Since the array is already sorted, picking the MIDDLE element as the root guarantees roughly equal-sized left and right halves — which is exactly what makes the resulting tree height-balanced. Recursively apply the same idea: build(lo, hi) picks nums[mid] as the current subtree\'s root, then recursively builds the left child from the left half (lo to mid-1) and the right child from the right half (mid+1 to hi). The base case is when lo > hi — an empty range means no node here, return null.',
    steps: [
      { num:1, icon:'🎯', title:'Base Case: Empty Range', desc:'If lo > hi, there are no elements left in this range — return null (no node here).' },
      { num:2, icon:'📐', title:'Pick the Middle',          desc:'mid = (lo+hi)/2. nums[mid] becomes the root of this subtree — the balance comes from always splitting in half.' },
      { num:3, icon:'🆕', title:'Create the Node',           desc:'Make a new TreeNode with value nums[mid].' },
      { num:4, icon:'⬅️', title:'Recurse Left Half',          desc:'root->left = build(lo, mid-1) — everything strictly smaller than nums[mid].' },
      { num:5, icon:'➡️', title:'Recurse Right Half',          desc:'root->right = build(mid+1, hi) — everything strictly larger than nums[mid]. Return root once both sides are attached.' },
    ],
  },
  25: {
    title: 'Fisher-Yates Shuffle',
    approach:
      'Walk the array backwards, from the last index down to index 1. At each position i, pick a RANDOM index j somewhere in [0, i] (including i itself), then swap arr[i] and arr[j]. This guarantees every element has an equal chance of ending up in every position — because each step "locks in" one final position by swapping in a uniformly random candidate from everything not yet locked. Doing this for every index from the end down to 1 produces every permutation with equal probability. reset() simply restores the array to a saved copy of the original.',
    steps: [
      { num:1, icon:'💾', title:'Store the Original',    desc:'Constructor saves a copy of nums as "original" — this is what reset() will restore later.' },
      { num:2, icon:'🔄', title:'Walk Backwards',         desc:'shuffle() starts at i = last index, moving down to i = 1 (never touching index 0 directly as i).' },
      { num:3, icon:'🎲', title:'Pick Random j in [0, i]', desc:'At each i, generate a random index j between 0 and i (inclusive) — j could even equal i itself.' },
      { num:4, icon:'🔀', title:'Swap arr[i] and arr[j]', desc:'Swap the two positions. This locks in a uniformly random value at position i.' },
      { num:5, icon:'🏁', title:'Done at i = 0',           desc:'Once i reaches 0, every position has had a random element locked in. Return the fully shuffled array.' },
    ],
  },
  26: {
    title: 'One-Slot Cache Wrapping the Real Iterator',
    approach:
      'The underlying Iterator only supports next() (consume + advance) and hasNext(). To add peek() WITHOUT breaking that iterator\'s one-directional nature, keep a single cached value and a flag. peek(): if nothing is cached yet, pull ONE value from the real iterator and store it — this is the only time the real iterator actually advances during a peek. Then always return the cached value without consuming further. next(): if something is cached (from a prior peek), hand back that cached value and clear the flag — WITHOUT touching the real iterator again, since we already consumed it during the peek. If nothing is cached, just call the real iterator\'s next() directly. hasNext(): true if we have a cached value OR the real iterator still has more.',
    steps: [
      { num:1, icon:'🎯', title:'Check the Cache',        desc:'peek() or next(): first check if hasCached is true — a value from a previous peek is sitting ready.' },
      { num:2, icon:'📥', title:'Pull & Cache (peek only)', desc:'peek(), if nothing cached: call the REAL iterator\'s next() ONCE, store the result, set hasCached=true.' },
      { num:3, icon:'👁️', title:'Return Without Advancing', desc:'peek() always returns the cached value — the pointer conceptually stays put since we never re-pull.' },
      { num:4, icon:'📤', title:'Consume the Cache (next only)', desc:'next(), if cached: return the cached value and clear hasCached — this "spends" the previously peeked value.' },
      { num:5, icon:'🔀', title:'Fallback to Real Iterator', desc:'next(), if nothing cached: just delegate directly to the real iterator\'s next().' },
    ],
  },
  28: {
    title: 'Custom Comparator — Compare by Concatenation',
    approach:
      'Convert every number to a string first. The key insight: to decide whether "a" should come before "b" in the final result, don\'t compare a and b as numbers — compare the two possible CONCATENATIONS, a+b versus b+a. Whichever concatenation is lexicographically larger tells you the better order. Sort all the strings using this custom comparator (descending — bigger concatenation wins, comes first). Finally, join everything together. One edge case: if the largest element after sorting is "0", every number must be 0, so the answer is just "0" (avoiding a wrong result like "000").',
    steps: [
      { num:1, icon:'🔤', title:'Convert to Strings',     desc:'Turn every number into its string form so we can concatenate and compare them directly.' },
      { num:2, icon:'⚖️', title:'Compare a+b vs b+a',      desc:'For any two strings a and b, compare the concatenation a+b against b+a — whichever is lexicographically bigger should go first.' },
      { num:3, icon:'🔀', title:'Sort with This Rule',      desc:'Sort the whole array using this comparator, largest-concatenation-first, instead of normal numeric or alphabetic order.' },
      { num:4, icon:'0️⃣', title:'Handle the All-Zero Case', desc:'If the first (largest) element after sorting is "0", every number is 0 — return "0" directly instead of "000...".' },
      { num:5, icon:'🔗', title:'Join and Return',          desc:'Concatenate every string in sorted order into one final result string.' },
    ],
  },
  29: {
  title: 'Recursive DFS — Splice Child List In Place',
  approach:
    'Walk the list with curr, saving nextNode = curr->next BEFORE any pointer surgery. If curr has a child, recursively flatten that child list first (this returns the TAIL of the fully-flattened child branch). Then splice: curr->next becomes the child head, the child head\'s prev becomes curr, and curr->child is cleared to null. If nextNode existed, reconnect the child\'s tail to it (childTail->next = nextNode, nextNode->prev = childTail). Update tail to childTail. If curr has no child, tail is just curr itself. Move curr to nextNode and repeat. Return tail at the end — this is what lets a PARENT call know where its child branch ended, so it can splice correctly too.',
  steps: [
    { num:1, icon:'👀', title:'Save nextNode First',    desc:'Before touching any pointers, save nextNode = curr->next — we\'ll need it after the splice.' },
    { num:2, icon:'🔍', title:'Check for a Child',       desc:'If curr->child exists, this node has a nested list that must be flattened and inserted right here.' },
    { num:3, icon:'🔄', title:'Recurse First',            desc:'Call solve(childHead) BEFORE doing any linking — this recursively flattens the ENTIRE child branch (and any of ITS children) and returns its tail.' },
    { num:4, icon:'🔗', title:'Splice Child Into Chain',  desc:'curr->next = childHead, childHead->prev = curr, curr->child = null. If nextNode exists, childTail->next = nextNode and nextNode->prev = childTail.' },
    { num:5, icon:'🏁', title:'Advance & Return Tail',     desc:'tail becomes childTail (or curr if no child). Move curr = nextNode and repeat. Return tail so any parent call knows where THIS level ended.' },
  ],
},
30: {
  title: 'Dutch National Flag — Three Pointers, One Pass',
  approach:
    'Maintain three pointers: low (boundary of the 0-region), mid (current element being examined), and high (boundary of the 2-region). The invariant: everything before low is 0, everything between low and mid is 1, everything after high is 2, and everything from mid to high is still unknown. At each step, look at nums[mid]: if it\'s 0, swap it to the low boundary and advance BOTH low and mid (the swapped-in value at mid is now confirmed to be a 1 — or was already checked). If it\'s 1, it\'s already in the right zone — just advance mid. If it\'s 2, swap it to the high boundary and decrement high — but do NOT advance mid, since the value swapped in from the high end hasn\'t been examined yet and could be a 0, 1, or 2 itself.',
  steps: [
    { num:1, icon:'🎯', title:'Init Three Pointers',   desc:'low=0, mid=0, high=n-1. Everything is "unknown" between mid and high initially.' },
    { num:2, icon:'0️⃣', title:'nums[mid] == 0',         desc:'Swap nums[low] and nums[mid], then advance BOTH low++ and mid++ — the 0 is now correctly placed, and we can trust the swapped value at mid.' },
    { num:3, icon:'1️⃣', title:'nums[mid] == 1',         desc:'Already in the correct middle zone — just advance mid++, no swap needed.' },
    { num:4, icon:'2️⃣', title:'nums[mid] == 2',          desc:'Swap nums[mid] and nums[high], then decrement high-- ONLY — do not advance mid, since the newly swapped-in value at mid is still unexamined.' },
    { num:5, icon:'🏁', title:'Done When mid > high',    desc:'Once mid crosses high, every element has been classified. The array is now sorted: 0s, then 1s, then 2s.' },
  ],
},
  };




















  
















































































  /* ──────────────────────────────────────────────────────────────
    TEST_CASES — 3 examples per animated problem
  ────────────────────────────────────────────────────────────── */
  export const TEST_CASES = {
    /* ── Two Sum ── */
    1: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[2,7,11,15], target=9 → [0,1]',
        arr: [2, 7, 11, 15],
        target: 9,
        expected: '[0,1]',
        steps: [
          { i:-1, complement:null, map:{},        foundIdx:null, result:null, desc:'Init: nums=[2,7,11,15], target=9. Map is empty.' },
          { i:0,  complement:7,    map:{},        foundIdx:null, result:null, desc:'i=0, nums[0]=2. complement = 9-2 = 7. Is 7 in map? ❌ No.' },
          { i:0,  complement:7,    map:{'2':0},   foundIdx:null, result:null, desc:'Store 2 → index 0. map = {2:0}.' },
          { i:1,  complement:2,    map:{'2':0},   foundIdx:null, result:null, desc:'i=1, nums[1]=7. complement = 9-7 = 2. Is 2 in map? ✅ Yes! At index 0.' },
          { i:1,  complement:2,    map:{'2':0},   foundIdx:0, result:[0,1],   desc:'🎉 Found it! Return [map[2], 1] = [0, 1].' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'nums=[3,2,4], target=6 → [1,2]',
        arr: [3, 2, 4],
        target: 6,
        expected: '[1,2]',
        steps: [
          { i:-1, complement:null, map:{},              foundIdx:null, result:null, desc:'Init: nums=[3,2,4], target=6. Map is empty.' },
          { i:0,  complement:3,    map:{},              foundIdx:null, result:null, desc:'i=0, nums[0]=3. complement = 6-3 = 3. Is 3 in map? ❌ No.' },
          { i:0,  complement:3,    map:{'3':0},         foundIdx:null, result:null, desc:'Store 3 → index 0. map = {3:0}.' },
          { i:1,  complement:4,    map:{'3':0},         foundIdx:null, result:null, desc:'i=1, nums[1]=2. complement = 6-2 = 4. Is 4 in map? ❌ No.' },
          { i:1,  complement:4,    map:{'3':0,'2':1},   foundIdx:null, result:null, desc:'Store 2 → index 1. map = {3:0, 2:1}.' },
          { i:2,  complement:2,    map:{'3':0,'2':1},   foundIdx:null, result:null, desc:'i=2, nums[2]=4. complement = 6-4 = 2. Is 2 in map? ✅ Yes! At index 1.' },
          { i:2,  complement:2,    map:{'3':0,'2':1},   foundIdx:1, result:[1,2],  desc:'🎉 Found it! Return [map[2], 2] = [1, 2].' },
        ],
      },
      {
        label: 'Example 3 — duplicate values',
        caption: 'nums=[3,3], target=6 → [0,1]',
        arr: [3, 3],
        target: 6,
        expected: '[0,1]',
        steps: [
          { i:-1, complement:null, map:{},        foundIdx:null, result:null, desc:'Init: nums=[3,3], target=6. Map is empty.' },
          { i:0,  complement:3,    map:{},        foundIdx:null, result:null, desc:'i=0, nums[0]=3. complement = 6-3 = 3. Is 3 in map? ❌ Not yet (map is still empty).' },
          { i:0,  complement:3,    map:{'3':0},   foundIdx:null, result:null, desc:'Store 3 → index 0. map = {3:0}.' },
          { i:1,  complement:3,    map:{'3':0},   foundIdx:null, result:null, desc:'i=1, nums[1]=3. complement = 6-3 = 3. Is 3 in map? ✅ Yes! At index 0 (the first 3, not this one).' },
          { i:1,  complement:3,    map:{'3':0},   foundIdx:0, result:[0,1],   desc:'🎉 Found it! Return [0, 1]. Checking the map BEFORE storing avoids matching an element with itself.' },
        ],
      },
    ],
  },
    /* ── Binary Search ── */
    2: {
      tests: [
        {
          label:'Example 1', caption:'target=11 → index 5', arr:[1,3,5,7,9,11,13], target:11, expected:'5',
          steps:[
            { lo:0,hi:6,mid:-1,done:false,nf:false, desc:'nums=[1,3,5,7,9,11,13], target=11. lo=0, hi=6.' },
            { lo:0,hi:6,mid:3, done:false,nf:false, desc:'mid=(0+6)/2=3. nums[3]=7. 11>7 → lo=mid+1=4.' },
            { lo:4,hi:6,mid:5, done:false,nf:false, desc:'lo=4,hi=6. mid=(4+6)/2=5. nums[5]=11. 11==11 ✅' },
            { lo:5,hi:5,mid:5, done:true, nf:false, desc:'🎉 Target 11 found at index 5. Return 5.' },
          ],
        },
        {
          label:'Example 2', caption:'target=9 → index 4', arr:[-1,0,3,5,9,12], target:9, expected:'4',
          steps:[
            { lo:0,hi:5,mid:-1,done:false,nf:false, desc:'nums=[-1,0,3,5,9,12], target=9. lo=0, hi=5.' },
            { lo:0,hi:5,mid:2, done:false,nf:false, desc:'mid=(0+5)/2=2. nums[2]=3. 9>3 → lo=mid+1=3.' },
            { lo:3,hi:5,mid:4, done:false,nf:false, desc:'lo=3,hi=5. mid=(3+5)/2=4. nums[4]=9. 9==9 ✅' },
            { lo:4,hi:4,mid:4, done:true, nf:false, desc:'🎉 Target 9 found at index 4. Return 4.' },
          ],
        },
        {
          label:'Example 3 (not found)', caption:'target=6 → -1', arr:[1,2,3,4,5], target:6, expected:'-1',
          steps:[
            { lo:0,hi:4,mid:-1,done:false,nf:false, desc:'nums=[1,2,3,4,5], target=6. lo=0, hi=4.' },
            { lo:0,hi:4,mid:2, done:false,nf:false, desc:'mid=2. nums[2]=3. 6>3 → lo=3.' },
            { lo:3,hi:4,mid:3, done:false,nf:false, desc:'lo=3,hi=4. mid=3. nums[3]=4. 6>4 → lo=4.' },
            { lo:4,hi:4,mid:4, done:false,nf:false, desc:'lo=4,hi=4. mid=4. nums[4]=5. 6>5 → lo=5.' },
            { lo:5,hi:4,mid:-1,done:true, nf:true,  desc:'lo(5) > hi(4). Search space exhausted → Return −1 ❌' },
          ],
        },
      ],
    },

    /* ── Valid Parentheses ── */
    3: {
      tests: [
        {
          label:'Example 1', caption:'"()" → true', input:'()', expected:'true',
          steps:[
            { i:-1, stk:[],          pop:null, done:false, fail:false, desc:'s="()". Initialize empty stack.' },
            { i:0,  stk:['('],       pop:null, done:false, fail:false, desc:'i=0, "(". Opening bracket → push.' },
            { i:1,  stk:[],          pop:'(',  done:false, fail:false, desc:'i=1, ")". Top="(" matches ✅ → Pop.' },
            { i:-1, stk:[],          pop:null, done:true,  fail:false, desc:'Stack empty → return true 🎉' },
          ],
        },
        {
          label:'Example 2', caption:'"()[]{}" → true', input:'()[]{}', expected:'true',
          steps:[
            { i:-1, stk:[],              pop:null, done:false, fail:false, desc:'s="()[]{}". Init empty stack.' },
            { i:0,  stk:['('],           pop:null, done:false, fail:false, desc:'i=0, "(". Push. Stack: ["("]' },
            { i:1,  stk:[],              pop:'(',  done:false, fail:false, desc:'i=1, ")". Matches "(" ✅ Pop.' },
            { i:2,  stk:['['],           pop:null, done:false, fail:false, desc:'i=2, "[". Push. Stack: ["["]' },
            { i:3,  stk:[],              pop:'[',  done:false, fail:false, desc:'i=3, "]". Matches "[" ✅ Pop.' },
            { i:4,  stk:['{'],           pop:null, done:false, fail:false, desc:'i=4, "{". Push. Stack: ["{"]' },
            { i:5,  stk:[],              pop:'{',  done:false, fail:false, desc:'i=5, "}". Matches "{" ✅ Pop.' },
            { i:-1, stk:[],              pop:null, done:true,  fail:false, desc:'Stack empty → return true 🎉' },
          ],
        },
        {
          label:'Example 3 (fail)', caption:'"(]" → false', input:'(]', expected:'false',
          steps:[
            { i:-1, stk:[],    pop:null, done:false, fail:false, desc:'s="(]". Init empty stack.' },
            { i:0,  stk:['('], pop:null, done:false, fail:false, desc:'i=0, "(". Opening bracket → push.' },
            { i:1,  stk:['('], pop:null, done:false, fail:true,  desc:'i=1, "]". Top="(" does NOT match "]" ❌ MISMATCH!' },
            { i:-1, stk:['('], pop:null, done:true,  fail:true,  desc:'Bracket mismatch → return false ❌' },
          ],
        },
      ],
    },
    4: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="abcabcbb" → 3',
        arr: ['a','b','c','a','b','c','b','b'],
        expected: '3',
        steps: [
          { right:-1, left:0, map:{},                              maxLen:0, windowStart:0, windowEnd:-1, dup:null, desc:'Init: left=0, maxLen=0, map={}.' },
          { right:0,  left:0, map:{a:0},                            maxLen:1, windowStart:0, windowEnd:0,  dup:null, desc:'"a" new → map[a]=0. Window="a" (len 1). maxLen=1.' },
          { right:1,  left:0, map:{a:0,b:1},                        maxLen:2, windowStart:0, windowEnd:1,  dup:null, desc:'"b" new → map[b]=1. Window="ab" (len 2). maxLen=2.' },
          { right:2,  left:0, map:{a:0,b:1,c:2},                    maxLen:3, windowStart:0, windowEnd:2,  dup:null, desc:'"c" new → map[c]=2. Window="abc" (len 3). maxLen=3.' },
          { right:3,  left:0, map:{a:0,b:1,c:2},                    maxLen:3, windowStart:0, windowEnd:3,  dup:'a',  desc:'"a" seen at 0, which is ≥ left(0) → duplicate inside window!' },
          { right:3,  left:1, map:{a:3,b:1,c:2},                    maxLen:3, windowStart:1, windowEnd:3,  dup:null, desc:'Shrink: left → 1. map[a]=3. Window="bca" (len 3). maxLen stays 3.' },
          { right:4,  left:1, map:{a:3,b:1,c:2},                    maxLen:3, windowStart:1, windowEnd:4,  dup:'b',  desc:'"b" seen at 1, which is ≥ left(1) → duplicate inside window!' },
          { right:4,  left:2, map:{a:3,b:4,c:2},                    maxLen:3, windowStart:2, windowEnd:4,  dup:null, desc:'Shrink: left → 2. map[b]=4. Window="cab" (len 3). maxLen stays 3.' },
          { right:5,  left:2, map:{a:3,b:4,c:2},                    maxLen:3, windowStart:2, windowEnd:5,  dup:'c',  desc:'"c" seen at 2, which is ≥ left(2) → duplicate inside window!' },
          { right:5,  left:3, map:{a:3,b:4,c:5},                    maxLen:3, windowStart:3, windowEnd:5,  dup:null, desc:'Shrink: left → 3. map[c]=5. Window="abc" (len 3). maxLen stays 3.' },
          { right:6,  left:3, map:{a:3,b:4,c:5},                    maxLen:3, windowStart:3, windowEnd:6,  dup:'b',  desc:'"b" seen at 4, which is ≥ left(3) → duplicate inside window!' },
          { right:6,  left:5, map:{a:3,b:6,c:5},                    maxLen:3, windowStart:5, windowEnd:6,  dup:null, desc:'Shrink: left → 5. map[b]=6. Window="cb" (len 2). maxLen stays 3.' },
          { right:7,  left:5, map:{a:3,b:6,c:5},                    maxLen:3, windowStart:5, windowEnd:7,  dup:'b',  desc:'"b" seen at 6, which is ≥ left(5) → duplicate inside window!' },
          { right:7,  left:7, map:{a:3,b:7,c:5},                    maxLen:3, windowStart:7, windowEnd:7,  dup:null, desc:'Shrink: left → 7. map[b]=7. Window="b" (len 1). maxLen stays 3.' },
          { right:-1, left:7, map:{a:3,b:7,c:5},                    maxLen:3, windowStart:7, windowEnd:7,  dup:null, desc:'🎉 Done! Longest window was "abc" → length 3.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 's="bbbbb" → 1',
        arr: ['b','b','b','b','b'],
        expected: '1',
        steps: [
          { right:-1, left:0, map:{},        maxLen:0, windowStart:0, windowEnd:-1, dup:null, desc:'Init: left=0, maxLen=0, map={}.' },
          { right:0,  left:0, map:{b:0},      maxLen:1, windowStart:0, windowEnd:0,  dup:null, desc:'"b" new → map[b]=0. Window="b" (len 1). maxLen=1.' },
          { right:1,  left:0, map:{b:0},      maxLen:1, windowStart:0, windowEnd:1,  dup:'b',  desc:'"b" seen at 0, which is ≥ left(0) → duplicate!' },
          { right:1,  left:1, map:{b:1},      maxLen:1, windowStart:1, windowEnd:1,  dup:null, desc:'Shrink: left → 1. map[b]=1. Window="b" (len 1). maxLen stays 1.' },
          { right:2,  left:1, map:{b:1},      maxLen:1, windowStart:1, windowEnd:2,  dup:'b',  desc:'"b" seen at 1, which is ≥ left(1) → duplicate!' },
          { right:2,  left:2, map:{b:2},      maxLen:1, windowStart:2, windowEnd:2,  dup:null, desc:'Shrink: left → 2. map[b]=2. Window="b" (len 1). maxLen stays 1.' },
          { right:3,  left:2, map:{b:2},      maxLen:1, windowStart:2, windowEnd:3,  dup:'b',  desc:'"b" seen at 2, which is ≥ left(2) → duplicate!' },
          { right:3,  left:3, map:{b:3},      maxLen:1, windowStart:3, windowEnd:3,  dup:null, desc:'Shrink: left → 3. map[b]=3. Window="b" (len 1). maxLen stays 1.' },
          { right:4,  left:3, map:{b:3},      maxLen:1, windowStart:3, windowEnd:4,  dup:'b',  desc:'"b" seen at 3, which is ≥ left(3) → duplicate!' },
          { right:4,  left:4, map:{b:4},      maxLen:1, windowStart:4, windowEnd:4,  dup:null, desc:'Shrink: left → 4. map[b]=4. Window="b" (len 1). maxLen stays 1.' },
          { right:-1, left:4, map:{b:4},      maxLen:1, windowStart:4, windowEnd:4,  dup:null, desc:'🎉 Done! Every char repeats immediately → longest window length 1.' },
        ],
      },
      {
        label: 'Example 3',
        caption: 's="pwwkew" → 3',
        arr: ['p','w','w','k','e','w'],
        expected: '3',
        steps: [
          { right:-1, left:0, map:{},                     maxLen:0, windowStart:0, windowEnd:-1, dup:null, desc:'Init: left=0, maxLen=0, map={}.' },
          { right:0,  left:0, map:{p:0},                   maxLen:1, windowStart:0, windowEnd:0,  dup:null, desc:'"p" new → map[p]=0. Window="p" (len 1). maxLen=1.' },
          { right:1,  left:0, map:{p:0,w:1},                maxLen:2, windowStart:0, windowEnd:1,  dup:null, desc:'"w" new → map[w]=1. Window="pw" (len 2). maxLen=2.' },
          { right:2,  left:0, map:{p:0,w:1},                maxLen:2, windowStart:0, windowEnd:2,  dup:'w',  desc:'"w" seen at 1, which is ≥ left(0) → duplicate!' },
          { right:2,  left:2, map:{p:0,w:2},                maxLen:2, windowStart:2, windowEnd:2,  dup:null, desc:'Shrink: left → 2. map[w]=2. Window="w" (len 1). maxLen stays 2.' },
          { right:3,  left:2, map:{p:0,w:2,k:3},            maxLen:2, windowStart:2, windowEnd:3,  dup:null, desc:'"k" new → map[k]=3. Window="wk" (len 2). maxLen stays 2.' },
          { right:4,  left:2, map:{p:0,w:2,k:3,e:4},        maxLen:3, windowStart:2, windowEnd:4,  dup:null, desc:'"e" new → map[e]=4. Window="wke" (len 3). maxLen=3.' },
          { right:5,  left:2, map:{p:0,w:2,k:3,e:4},        maxLen:3, windowStart:2, windowEnd:5,  dup:'w',  desc:'"w" seen at 2, which is ≥ left(2) → duplicate!' },
          { right:5,  left:3, map:{p:0,w:5,k:3,e:4},        maxLen:3, windowStart:3, windowEnd:5,  dup:null, desc:'Shrink: left → 3. map[w]=5. Window="kew" (len 3). maxLen stays 3.' },
          { right:-1, left:3, map:{p:0,w:5,k:3,e:4},        maxLen:3, windowStart:3, windowEnd:5,  dup:null, desc:'🎉 Done! Longest window was "wke" (or "kew") → length 3.' },
        ],
      },
    ],
  },
  9: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[1,2,3,1] → true',
        arr: [1, 2, 3, 1],
        expected: 'true',
        steps: [
          { active:-1, set:[], found:false, desc:'Init: nums=[1,2,3,1]. Empty set.' },
          { active:0,  set:[],  found:false, desc:'i=0, val=1. In set? ❌ → Insert 1.' },
          { active:0,  set:[1], found:false, desc:'Set: {1}. Advance.' },
          { active:1,  set:[1], found:false, desc:'i=1, val=2. In set? ❌ → Insert 2.' },
          { active:1,  set:[1,2], found:false, desc:'Set: {1,2}. Advance.' },
          { active:2,  set:[1,2], found:false, desc:'i=2, val=3. In set? ❌ → Insert 3.' },
          { active:2,  set:[1,2,3], found:false, desc:'Set: {1,2,3}. Advance.' },
          { active:3,  set:[1,2,3], found:true,  desc:'i=3, val=1. In set? ✅ Duplicate found!' },
          { active:-1, set:[1,2,3], found:true,  desc:'🎉 Return true — 1 appears twice.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'nums=[1,2,3,4] → false',
        arr: [1, 2, 3, 4],
        expected: 'false',
        steps: [
          { active:-1, set:[],       found:false, desc:'Init: nums=[1,2,3,4]. All unique!' },
          { active:0,  set:[],       found:false, desc:'i=0, val=1. Not in set ❌ → Insert.' },
          { active:1,  set:[1],      found:false, desc:'i=1, val=2. Not in set ❌ → Insert.' },
          { active:2,  set:[1,2],    found:false, desc:'i=2, val=3. Not in set ❌ → Insert.' },
          { active:3,  set:[1,2,3],  found:false, desc:'i=3, val=4. Not in set ❌ → Insert.' },
          { active:-1, set:[1,2,3,4],found:false, desc:'Loop ended. Set never had a match → Return false ❌' },
        ],
      },
      {
        label: 'Example 3',
        caption: 'nums=[1,1,1,3,3,4] → true (early duplicate)',
        arr: [1,1,1,3,3,4],
        expected: 'true',
        steps: [
          { active:-1, set:[],   found:false, desc:'Init: nums=[1,1,1,3,3,4]. Testing early duplicate.' },
          { active:0,  set:[],   found:false, desc:'i=0, val=1. Not in set ❌ → Insert.' },
          { active:1,  set:[1],  found:true,  desc:'i=1, val=1. Already in set ✅ → Duplicate immediately!' },
          { active:-1, set:[1],  found:true,  desc:'🎉 Return true — found duplicate at index 1.' },
        ],
      },
      {
        label: 'Example 4 — single element',
        caption: 'nums=[7] → false',
        arr: [7],
        expected: 'false',
        steps: [
          { active:-1, set:[],  found:false, desc:'Init: nums=[7]. Only one element — can\'t have a duplicate.' },
          { active:0,  set:[],  found:false, desc:'i=0, val=7. Not in set ❌ → Insert.' },
          { active:0,  set:[7], found:false, desc:'Set: {7}. Advance.' },
          { active:-1, set:[7], found:false, desc:'Loop ended after only 1 element. No duplicate possible → Return false ❌' },
        ],
      },
      {
        label: 'Example 5 — back-to-back duplicate',
        caption: 'nums=[5,5,6,7] → true (adjacent duplicate)',
        arr: [5, 5, 6, 7],
        expected: 'true',
        steps: [
          { active:-1, set:[],  found:false, desc:'Init: nums=[5,5,6,7]. Testing immediately-adjacent duplicate.' },
          { active:0,  set:[],  found:false, desc:'i=0, val=5. Not in set ❌ → Insert.' },
          { active:0,  set:[5], found:false, desc:'Set: {5}. Advance.' },
          { active:1,  set:[5], found:true,  desc:'i=1, val=5. Already in set ✅ → Duplicate found right next door!' },
          { active:-1, set:[5], found:true,  desc:'🎉 Return true — adjacent duplicate at index 0 and 1.' },
        ],
      },
      {
        label: 'Example 6 — duplicate far apart',
        caption: 'nums=[9,1,2,3,4,5,9] → true (duplicate at both ends)',
        arr: [9, 1, 2, 3, 4, 5, 9],
        expected: 'true',
        steps: [
          { active:-1, set:[],             found:false, desc:'Init: nums=[9,1,2,3,4,5,9]. Testing a duplicate separated by 5 other elements.' },
          { active:0,  set:[],             found:false, desc:'i=0, val=9. Not in set ❌ → Insert.' },
          { active:0,  set:[9],            found:false, desc:'Set: {9}. Advance.' },
          { active:1,  set:[9],            found:false, desc:'i=1, val=1. Not in set ❌ → Insert.' },
          { active:1,  set:[9,1],          found:false, desc:'Set: {9,1}. Advance.' },
          { active:2,  set:[9,1],          found:false, desc:'i=2, val=2. Not in set ❌ → Insert.' },
          { active:2,  set:[9,1,2],        found:false, desc:'Set: {9,1,2}. Advance.' },
          { active:3,  set:[9,1,2],        found:false, desc:'i=3, val=3. Not in set ❌ → Insert.' },
          { active:3,  set:[9,1,2,3],      found:false, desc:'Set: {9,1,2,3}. Advance.' },
          { active:4,  set:[9,1,2,3],      found:false, desc:'i=4, val=4. Not in set ❌ → Insert.' },
          { active:4,  set:[9,1,2,3,4],    found:false, desc:'Set: {9,1,2,3,4}. Advance.' },
          { active:5,  set:[9,1,2,3,4],    found:false, desc:'i=5, val=5. Not in set ❌ → Insert.' },
          { active:5,  set:[9,1,2,3,4,5],  found:false, desc:'Set: {9,1,2,3,4,5}. Advance.' },
          { active:6,  set:[9,1,2,3,4,5],  found:true,  desc:'i=6, val=9. Already in set ✅ → The set "remembered" 9 from way back at index 0!' },
          { active:-1, set:[9,1,2,3,4,5],  found:true,  desc:'🎉 Return true — duplicate found even though the two 9s were far apart. This shows why the hash set works regardless of distance.' },
        ],
      },
    ],
  },
  5: {
    tests: [
      {
        label: 'Example 1',
        caption: 'head=[1,2,3,4,5], n=2 → [1,2,3,5]',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
          { idx: 2, val: 3 },
          { idx: 3, val: 4 },
          { idx: 4, val: 5 },
        ],
        n: 2,
        expected: '[1,2,3,5]',
        steps: [
          { phase:'count', headIdx:0, tempIdx:0, length:0, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Pass 1 begins. temp = head (node val 1). length = 0.' },
          { phase:'count', headIdx:0, tempIdx:0, length:1, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Visit node(1) → length = 1. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:1, length:2, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Visit node(2) → length = 2. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:2, length:3, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Visit node(3) → length = 3. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:3, length:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Visit node(4) → length = 4. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:4, length:5, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'Visit node(5) → length = 5. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:null, length:5, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'temp reaches nullptr. Pass 1 done — length = 5.' },
          { phase:'locate', headIdx:0, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'position = length - n + 1 = 5 - 2 + 1 = 4. We must remove the 4th node (val 4).' },
          { phase:'locate', headIdx:0, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'position ≠ 1, so this is not the head — use the prev-walk approach.' },
          { phase:'locate', headIdx:0, prevIdx:0, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'prev starts at head (node val 1).' },
          { phase:'locate', headIdx:0, prevIdx:1, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'i=1 (< position-1=3): prev moves to node(2).' },
          { phase:'locate', headIdx:0, prevIdx:2, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'i=2 (< 3): prev moves to node(3). Loop ends (i=3 fails < 3).' },
          { phase:'delete', headIdx:0, prevIdx:2, delIdx:3, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3},{from:3,to:4}], desc:'delNode = prev->next → node(4). This is our target — highlighted in red.' },
          { phase:'delete', headIdx:0, prevIdx:2, delIdx:3, length:5, position:4, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3,kind:'fading'},{from:2,to:4,kind:'skip'}], desc:'prev->next = delNode->next → node(3) now points straight to node(5), skipping node(4).' },
          { phase:'done', headIdx:0, removedIdx:3, links:[{from:0,to:1},{from:1,to:2},{from:2,to:4}], desc:'🎉 node(4) unlinked. List is now 1 → 2 → 3 → 5.' },
        ],
      },
      {
        label: 'Example 2 — remove head',
        caption: 'head=[1], n=1 → []',
        nodes: [
          { idx: 0, val: 1 },
        ],
        n: 1,
        expected: '[]',
        steps: [
          { phase:'count', headIdx:0, tempIdx:0, length:0, links:[], desc:'Pass 1 begins. temp = head (node val 1). length = 0.' },
          { phase:'count', headIdx:0, tempIdx:0, length:1, links:[], desc:'Visit node(1) → length = 1. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:null, length:1, links:[], desc:'temp reaches nullptr. Pass 1 done — length = 1.' },
          { phase:'locate', headIdx:0, length:1, position:1, links:[], desc:'position = length - n + 1 = 1 - 1 + 1 = 1. The target is the head itself!' },
          { phase:'delete-head', headIdx:0, delIdx:0, length:1, position:1, links:[], desc:'position == 1 → special case. delNode = head (node val 1).' },
          { phase:'delete-head', headIdx:null, delIdx:0, length:1, position:1, links:[], desc:'head = head->next = nullptr. The list is now empty.' },
          { phase:'done', headIdx:null, removedIdx:0, links:[], desc:'🎉 Head removed. List is now empty.' },
        ],
      },
      {
        label: 'Example 3 — remove tail',
        caption: 'head=[1,2], n=1 → [1]',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
        ],
        n: 1,
        expected: '[1]',
        steps: [
          { phase:'count', headIdx:0, tempIdx:0, length:0, links:[{from:0,to:1}], desc:'Pass 1 begins. temp = head (node val 1). length = 0.' },
          { phase:'count', headIdx:0, tempIdx:0, length:1, links:[{from:0,to:1}], desc:'Visit node(1) → length = 1. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:1, length:2, links:[{from:0,to:1}], desc:'Visit node(2) → length = 2. Move temp forward.' },
          { phase:'count', headIdx:0, tempIdx:null, length:2, links:[{from:0,to:1}], desc:'temp reaches nullptr. Pass 1 done — length = 2.' },
          { phase:'locate', headIdx:0, length:2, position:2, links:[{from:0,to:1}], desc:'position = length - n + 1 = 2 - 1 + 1 = 2. We must remove the 2nd node (val 2) — the tail.' },
          { phase:'locate', headIdx:0, prevIdx:0, length:2, position:2, links:[{from:0,to:1}], desc:'position ≠ 1. prev starts at head (node val 1).' },
          { phase:'locate', headIdx:0, prevIdx:0, length:2, position:2, links:[{from:0,to:1}], desc:'Loop condition i < position-1 → i < 1 fails immediately (i starts at 1). prev stays at node(1).' },
          { phase:'delete', headIdx:0, prevIdx:0, delIdx:1, length:2, position:2, links:[{from:0,to:1}], desc:'delNode = prev->next → node(2). This is our target (also the tail).' },
          { phase:'delete', headIdx:0, prevIdx:0, delIdx:1, length:2, position:2, links:[{from:0,to:1,kind:'fading'}], desc:'prev->next = delNode->next = nullptr. node(1) becomes the new tail.' },
          { phase:'done', headIdx:0, removedIdx:1, links:[], desc:'🎉 Tail unlinked. List is now just 1 → nullptr.' },
        ],
      },
    ],
  },
  6: {
    tests: [
      {
        label: 'Example 1',
        caption: 'head=[1,2,2,1] → true',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
          { idx: 2, val: 2 },
          { idx: 3, val: 1 },
        ],
        expected: 'true',
        steps: [
          { phase:'push', tempIdx:0, curIdx:null, stack:[],          topVal:null, match:null, desc:'Pass 1: temp = head (val 1). Stack is empty.' },
          { phase:'push', tempIdx:0, curIdx:null, stack:[1],         topVal:null, match:null, desc:'Push temp->val (1) → stack = [1].' },
          { phase:'push', tempIdx:1, curIdx:null, stack:[1],         topVal:null, match:null, desc:'Move temp forward → node val 2.' },
          { phase:'push', tempIdx:1, curIdx:null, stack:[1,2],       topVal:null, match:null, desc:'Push 2 → stack = [1,2].' },
          { phase:'push', tempIdx:2, curIdx:null, stack:[1,2],       topVal:null, match:null, desc:'Move temp forward → node val 2.' },
          { phase:'push', tempIdx:2, curIdx:null, stack:[1,2,2],     topVal:null, match:null, desc:'Push 2 → stack = [1,2,2].' },
          { phase:'push', tempIdx:3, curIdx:null, stack:[1,2,2],     topVal:null, match:null, desc:'Move temp forward → node val 1.' },
          { phase:'push', tempIdx:3, curIdx:null, stack:[1,2,2,1],   topVal:null, match:null, desc:'Push 1 → stack = [1,2,2,1].' },
          { phase:'push', tempIdx:null,curIdx:null, stack:[1,2,2,1], topVal:null, match:null, desc:'temp reaches nullptr. Pass 1 done — stack holds the list, reversed on top.' },

          { phase:'compare', tempIdx:null, curIdx:0, stack:[1,2,2,1], topVal:1, match:null,  desc:'Pass 2: curr = head (val 1). Peek stack top = 1.' },
          { phase:'compare', tempIdx:null, curIdx:0, stack:[1,2,2,1], topVal:1, match:true,  desc:'curr->val(1) == top(1) ✅ Match!' },
          { phase:'pop',     tempIdx:null, curIdx:0, stack:[1,2,2],   topVal:null, match:null, desc:'Pop stack top → stack=[1,2,2]. Move curr forward.' },

          { phase:'compare', tempIdx:null, curIdx:1, stack:[1,2,2],   topVal:2, match:null,  desc:'curr moves to node val 2. Peek top = 2.' },
          { phase:'compare', tempIdx:null, curIdx:1, stack:[1,2,2],   topVal:2, match:true,  desc:'curr->val(2) == top(2) ✅ Match!' },
          { phase:'pop',     tempIdx:null, curIdx:1, stack:[1,2],     topVal:null, match:null, desc:'Pop → stack=[1,2]. Move curr forward.' },

          { phase:'compare', tempIdx:null, curIdx:2, stack:[1,2],     topVal:2, match:null,  desc:'curr moves to 3rd node (val 2). Peek top = 2.' },
          { phase:'compare', tempIdx:null, curIdx:2, stack:[1,2],     topVal:2, match:true,  desc:'Match ✅' },
          { phase:'pop',     tempIdx:null, curIdx:2, stack:[1],       topVal:null, match:null, desc:'Pop → stack=[1]. Move curr forward.' },

          { phase:'compare', tempIdx:null, curIdx:3, stack:[1],       topVal:1, match:null,  desc:'curr moves to last node (val 1). Peek top = 1.' },
          { phase:'compare', tempIdx:null, curIdx:3, stack:[1],       topVal:1, match:true,  desc:'Match ✅' },
          { phase:'pop',     tempIdx:null, curIdx:3, stack:[],        topVal:null, match:null, desc:'Pop → stack empty. curr reaches nullptr.' },

          { phase:'done', tempIdx:null, curIdx:null, stack:[], result:true, desc:'🎉 curr exhausted, every comparison matched → Palindrome! Return true.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'head=[1,2] → false',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
        ],
        expected: 'false',
        steps: [
          { phase:'push', tempIdx:0, curIdx:null, stack:[],    topVal:null, match:null, desc:'Pass 1: temp = head (val 1). Stack is empty.' },
          { phase:'push', tempIdx:0, curIdx:null, stack:[1],   topVal:null, match:null, desc:'Push 1 → stack = [1].' },
          { phase:'push', tempIdx:1, curIdx:null, stack:[1],   topVal:null, match:null, desc:'Move temp forward → node val 2.' },
          { phase:'push', tempIdx:1, curIdx:null, stack:[1,2], topVal:null, match:null, desc:'Push 2 → stack = [1,2].' },
          { phase:'push', tempIdx:null,curIdx:null, stack:[1,2], topVal:null, match:null, desc:'temp reaches nullptr. Pass 1 done.' },

          { phase:'compare', tempIdx:null, curIdx:0, stack:[1,2], topVal:2, match:null, desc:'Pass 2: curr = head (val 1). Peek stack top = 2.' },
          { phase:'compare', tempIdx:null, curIdx:0, stack:[1,2], topVal:2, match:false, desc:'curr->val(1) != top(2) ❌ Mismatch found!' },

          { phase:'done', tempIdx:null, curIdx:0, stack:[1,2], result:false, desc:'🎉 Mismatch → not a palindrome. Return false immediately.' },
        ],
      },
      {
        label: 'Example 3 — single node',
        caption: 'head=[1] → true',
        nodes: [
          { idx: 0, val: 1 },
        ],
        expected: 'true',
        steps: [
          { phase:'push', tempIdx:0, curIdx:null, stack:[],  topVal:null, match:null, desc:'Pass 1: temp = head (val 1). Stack is empty.' },
          { phase:'push', tempIdx:0, curIdx:null, stack:[1], topVal:null, match:null, desc:'Push 1 → stack = [1].' },
          { phase:'push', tempIdx:null,curIdx:null, stack:[1], topVal:null, match:null, desc:'temp reaches nullptr. Pass 1 done.' },

          { phase:'compare', tempIdx:null, curIdx:0, stack:[1], topVal:1, match:null, desc:'Pass 2: curr = head (val 1). Peek stack top = 1.' },
          { phase:'compare', tempIdx:null, curIdx:0, stack:[1], topVal:1, match:true, desc:'curr->val(1) == top(1) ✅ Match!' },
          { phase:'pop',     tempIdx:null, curIdx:0, stack:[],  topVal:null, match:null, desc:'Pop → stack empty. curr reaches nullptr.' },

          { phase:'done', tempIdx:null, curIdx:null, stack:[], result:true, desc:'🎉 Single node is trivially a palindrome. Return true.' },
        ],
      },
    ],
  },
  3: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="()[]{}" → true',
        arr: ['(', ')', '[', ']', '{', '}'],
        expected: 'true',
        steps: [
          { i:-1, stack:[],          topVal:null, match:null, result:null, desc:'Start scanning s = "()[]{}"' },
          { i:0,  stack:[],          topVal:null, match:null, result:null, desc:'i=0, char="(" → opener.' },
          { i:0,  stack:['('],       topVal:null, match:null, result:null, desc:'Push "(" → stack=[(].' },
          { i:1,  stack:['('],       topVal:'(',  match:true, result:null, desc:'i=1, char=")" → closer. Peek top="(" → matches ")" ✅' },
          { i:1,  stack:[],          topVal:null, match:null, result:null, desc:'Pop → stack=[]. ' },
          { i:2,  stack:[],          topVal:null, match:null, result:null, desc:'i=2, char="[" → opener.' },
          { i:2,  stack:['['],       topVal:null, match:null, result:null, desc:'Push "[" → stack=[[].' },
          { i:3,  stack:['['],       topVal:'[',  match:true, result:null, desc:'i=3, char="]" → closer. Peek top="[" → matches "]" ✅' },
          { i:3,  stack:[],          topVal:null, match:null, result:null, desc:'Pop → stack=[]. ' },
          { i:4,  stack:[],          topVal:null, match:null, result:null, desc:'i=4, char="{" → opener.' },
          { i:4,  stack:['{'],       topVal:null, match:null, result:null, desc:'Push "{" → stack=[{].' },
          { i:5,  stack:['{'],       topVal:'{',  match:true, result:null, desc:'i=5, char="}" → closer. Peek top="{" → matches "}" ✅' },
          { i:5,  stack:[],          topVal:null, match:null, result:null, desc:'Pop → stack=[]. ' },
          { i:-1, stack:[],          topVal:null, match:null, result:true, desc:'🎉 Scan done. Stack is empty → Valid! Return true.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 's="(]" → false',
        arr: ['(', ']'],
        expected: 'false',
        steps: [
          { i:-1, stack:[],    topVal:null, match:null, result:null, desc:'Start scanning s = "(]"' },
          { i:0,  stack:[],    topVal:null, match:null, result:null, desc:'i=0, char="(" → opener.' },
          { i:0,  stack:['('], topVal:null, match:null, result:null, desc:'Push "(" → stack=[(].' },
          { i:1,  stack:['('], topVal:'(',  match:false, result:null, desc:'i=1, char="]" → closer. Peek top="(" → does NOT match "]" ❌' },
          { i:1,  stack:['('], topVal:'(',  match:false, result:false, desc:'🎉 Mismatch found → Invalid! Return false immediately.' },
        ],
      },
      {
        label: 'Example 3',
        caption: 's="([)]" → false',
        arr: ['(', '[', ')', ']'],
        expected: 'false',
        steps: [
          { i:-1, stack:[],        topVal:null, match:null, result:null, desc:'Start scanning s = "([)]"' },
          { i:0,  stack:[],        topVal:null, match:null, result:null, desc:'i=0, char="(" → opener.' },
          { i:0,  stack:['('],     topVal:null, match:null, result:null, desc:'Push "(" → stack=[(].' },
          { i:1,  stack:['('],     topVal:null, match:null, result:null, desc:'i=1, char="[" → opener.' },
          { i:1,  stack:['(','['], topVal:null, match:null, result:null, desc:'Push "[" → stack=[(,[].' },
          { i:2,  stack:['(','['], topVal:'[',  match:false, result:null, desc:'i=2, char=")" → closer. Peek top="[" → does NOT match ")" ❌' },
          { i:2,  stack:['(','['], topVal:'[',  match:false, result:false, desc:'🎉 Mismatch (wrong nesting order) → Invalid! Return false immediately.' },
        ],
      },
      {
        label: 'Example 4 — leftover opener',
        caption: 's="(()" → false',
        arr: ['(', '(', ')'],
        expected: 'false',
        steps: [
          { i:-1, stack:[],        topVal:null, match:null, result:null, desc:'Start scanning s = "(()"' },
          { i:0,  stack:[],        topVal:null, match:null, result:null, desc:'i=0, char="(" → opener.' },
          { i:0,  stack:['('],     topVal:null, match:null, result:null, desc:'Push "(" → stack=[(].' },
          { i:1,  stack:['('],     topVal:null, match:null, result:null, desc:'i=1, char="(" → opener.' },
          { i:1,  stack:['(','('], topVal:null, match:null, result:null, desc:'Push "(" → stack=[(,(].' },
          { i:2,  stack:['(','('], topVal:'(',  match:true, result:null, desc:'i=2, char=")" → closer. Peek top="(" → matches ")" ✅' },
          { i:2,  stack:['('],     topVal:null, match:null, result:null, desc:'Pop → stack=[(]. ' },
          { i:-1, stack:['('],     topVal:null, match:null, result:false, desc:'🎉 Scan done, but stack NOT empty (leftover "(") → Invalid! Return false.' },
        ],
      },
    ],
  },
  8: {
    tests: [
      {
        label: 'Example 1',
        caption: 'prices=[7,1,5,3,6,4] → 5',
        arr: [7, 1, 5, 3, 6, 4],
        expected: '5',
        steps: [
          { phase:'init',   i:-1, bestBuyIdx:0, bestBuyVal:7, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Init: Best_buy = prices[0] = 7. max_profit = 0.' },

          { phase:'check',  i:1, bestBuyIdx:0, bestBuyVal:7, checkIdx:1, profit:null, maxProfit:0, isNewMax:false, desc:'i=1, price=1. Is 1 > Best_buy(7)? ❌ No — skip profit check.' },
          { phase:'update', i:1, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Best_buy = min(7,1) = 1. New cheapest day found: index 1.' },

          { phase:'check',  i:2, bestBuyIdx:1, bestBuyVal:1, checkIdx:2, profit:4, maxProfit:4, isNewMax:true, desc:'i=2, price=5. Is 5 > Best_buy(1)? ✅ Yes! profit = 5-1 = 4. New max_profit = 4! 🎉' },
          { phase:'update', i:2, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:4, isNewMax:false, desc:'Best_buy = min(1,5) = 1. Stays at index 1.' },

          { phase:'check',  i:3, bestBuyIdx:1, bestBuyVal:1, checkIdx:3, profit:2, maxProfit:4, isNewMax:false, desc:'i=3, price=3. Is 3 > Best_buy(1)? ✅ Yes! profit = 3-1 = 2. Not better than max_profit(4) — no update.' },
          { phase:'update', i:3, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:4, isNewMax:false, desc:'Best_buy = min(1,3) = 1. Stays at index 1.' },

          { phase:'check',  i:4, bestBuyIdx:1, bestBuyVal:1, checkIdx:4, profit:5, maxProfit:5, isNewMax:true, desc:'i=4, price=6. Is 6 > Best_buy(1)? ✅ Yes! profit = 6-1 = 5. New max_profit = 5! 🎉' },
          { phase:'update', i:4, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:5, isNewMax:false, desc:'Best_buy = min(1,6) = 1. Stays at index 1.' },

          { phase:'check',  i:5, bestBuyIdx:1, bestBuyVal:1, checkIdx:5, profit:3, maxProfit:5, isNewMax:false, desc:'i=5, price=4. Is 4 > Best_buy(1)? ✅ Yes! profit = 4-1 = 3. Not better than max_profit(5) — no update.' },
          { phase:'update', i:5, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:5, isNewMax:false, desc:'Best_buy = min(1,4) = 1. Stays at index 1.' },

          { phase:'done', i:-1, bestBuyIdx:1, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:5, isNewMax:false, desc:'🎉 Loop done. Best trade: buy day 1 (price 1), sell day 4 (price 6) → profit 5.' },
        ],
      },
      {
        label: 'Example 2 — no profit possible',
        caption: 'prices=[7,6,4,3,1] → 0',
        arr: [7, 6, 4, 3, 1],
        expected: '0',
        steps: [
          { phase:'init',   i:-1, bestBuyIdx:0, bestBuyVal:7, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Init: Best_buy = prices[0] = 7. max_profit = 0.' },

          { phase:'check',  i:1, bestBuyIdx:0, bestBuyVal:7, checkIdx:1, profit:null, maxProfit:0, isNewMax:false, desc:'i=1, price=6. Is 6 > Best_buy(7)? ❌ No — price only went down.' },
          { phase:'update', i:1, bestBuyIdx:1, bestBuyVal:6, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Best_buy = min(7,6) = 6. New cheapest day: index 1.' },

          { phase:'check',  i:2, bestBuyIdx:1, bestBuyVal:6, checkIdx:2, profit:null, maxProfit:0, isNewMax:false, desc:'i=2, price=4. Is 4 > Best_buy(6)? ❌ No.' },
          { phase:'update', i:2, bestBuyIdx:2, bestBuyVal:4, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Best_buy = min(6,4) = 4. New cheapest day: index 2.' },

          { phase:'check',  i:3, bestBuyIdx:2, bestBuyVal:4, checkIdx:3, profit:null, maxProfit:0, isNewMax:false, desc:'i=3, price=3. Is 3 > Best_buy(4)? ❌ No.' },
          { phase:'update', i:3, bestBuyIdx:3, bestBuyVal:3, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Best_buy = min(4,3) = 3. New cheapest day: index 3.' },

          { phase:'check',  i:4, bestBuyIdx:3, bestBuyVal:3, checkIdx:4, profit:null, maxProfit:0, isNewMax:false, desc:'i=4, price=1. Is 1 > Best_buy(3)? ❌ No.' },
          { phase:'update', i:4, bestBuyIdx:4, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Best_buy = min(3,1) = 1. New cheapest day: index 4.' },

          { phase:'done', i:-1, bestBuyIdx:4, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'🎉 Loop done. Prices only fell — no profitable trade exists. Return 0.' },
        ],
      },
      {
        label: 'Example 3',
        caption: 'prices=[2,4,1] → 2',
        arr: [2, 4, 1],
        expected: '2',
        steps: [
          { phase:'init',   i:-1, bestBuyIdx:0, bestBuyVal:2, checkIdx:null, profit:null, maxProfit:0, isNewMax:false, desc:'Init: Best_buy = prices[0] = 2. max_profit = 0.' },

          { phase:'check',  i:1, bestBuyIdx:0, bestBuyVal:2, checkIdx:1, profit:2, maxProfit:2, isNewMax:true, desc:'i=1, price=4. Is 4 > Best_buy(2)? ✅ Yes! profit = 4-2 = 2. New max_profit = 2! 🎉' },
          { phase:'update', i:1, bestBuyIdx:0, bestBuyVal:2, checkIdx:null, profit:null, maxProfit:2, isNewMax:false, desc:'Best_buy = min(2,4) = 2. Stays at index 0.' },

          { phase:'check',  i:2, bestBuyIdx:0, bestBuyVal:2, checkIdx:2, profit:null, maxProfit:2, isNewMax:false, desc:'i=2, price=1. Is 1 > Best_buy(2)? ❌ No.' },
          { phase:'update', i:2, bestBuyIdx:2, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:2, isNewMax:false, desc:'Best_buy = min(2,1) = 1. New cheapest day: index 2 — but too late to help, max_profit stays 2.' },

          { phase:'done', i:-1, bestBuyIdx:2, bestBuyVal:1, checkIdx:null, profit:null, maxProfit:2, isNewMax:false, desc:'🎉 Loop done. Best trade: buy day 0 (price 2), sell day 1 (price 4) → profit 2.' },
        ],
      },
    ],
  },




  7: {
    tests: [
      {
        label: 'Example 1 — has cycle',
        caption: 'head=[3,2,0,-4], pos=1 → true',
        nodes: [
          { idx: 0, val: 3 },
          { idx: 1, val: 2 },
          { idx: 2, val: 0 },
          { idx: 3, val: -4 },
        ],
        cycleTo: 1,
        expected: 'true',
        steps: [
          { slowIdx:0, fastIdx:0, phase:'init', result:null, desc:'Init: slow = head (val 3). fast = head (val 3). Both start together.' },

          // Iteration 1
          { slowIdx:0, fastIdx:1, phase:'fast-hop1', result:null, desc:'fast HOP 1: val 3 → val 2 (first of its two hops this round).' },
          { slowIdx:0, fastIdx:2, phase:'fast-hop2', result:null, desc:'fast HOP 2: val 2 → val 0. fast has now moved 2 nodes total this round.' },
          { slowIdx:1, fastIdx:2, phase:'slow-step', result:null, desc:'slow moves ONE node: val 3 → val 2. Compare: slow(val 2) vs fast(val 0) → not equal, keep racing.' },

          // Iteration 2
          { slowIdx:1, fastIdx:3, phase:'fast-hop1', result:null, desc:'fast HOP 1: val 0 → val -4.' },
          { slowIdx:1, fastIdx:1, phase:'fast-hop2', result:null, desc:'fast HOP 2: val -4 wraps around the cycle back to val 2!' },
          { slowIdx:2, fastIdx:1, phase:'slow-step', result:null, desc:'slow moves ONE node: val 2 → val 0. Compare: slow(val 0) vs fast(val 2) → not equal, keep racing.' },

          // Iteration 3
          { slowIdx:2, fastIdx:2, phase:'fast-hop1', result:null, desc:'fast HOP 1: val 2 → val 0.' },
          { slowIdx:2, fastIdx:3, phase:'fast-hop2', result:null, desc:'fast HOP 2: val 0 → val -4.' },
          { slowIdx:3, fastIdx:3, phase:'slow-step', result:true, desc:'🎯 slow moves ONE node: val 0 → val -4. slow == fast (both at val -4)! Cycle detected → return true.' },
        ],
      },
      {
        label: 'Example 2 — no cycle',
        caption: 'head=[1,2], pos=-1 → false',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
        ],
        cycleTo: null,
        expected: 'false',
        steps: [
          { slowIdx:0, fastIdx:0, phase:'init', result:null, desc:'Init: slow = head (val 1). fast = head (val 1).' },

          { slowIdx:0, fastIdx:1, phase:'fast-hop1', result:null, desc:'fast HOP 1: val 1 → val 2.' },
          { slowIdx:0, fastIdx:null, phase:'fast-hop2', result:null, desc:'fast HOP 2: tries to move past val 2, but there\'s no next node → fast becomes nullptr!' },
          { slowIdx:1, fastIdx:null, phase:'slow-step', result:null, desc:'slow moves ONE node: val 1 → val 2. But fast is nullptr now.' },
          { slowIdx:1, fastIdx:null, phase:'done', result:false, desc:'🚧 Loop condition fails (fast == nullptr). No cycle exists → return false.' },
        ],
      },
      {
        label: 'Example 3 — single node, self-loop',
        caption: 'head=[1], pos=0 → true',
        nodes: [
          { idx: 0, val: 1 },
        ],
        cycleTo: 0,
        expected: 'true',
        steps: [
          { slowIdx:0, fastIdx:0, phase:'init', result:null, desc:'Init: slow = head (val 1). fast = head (val 1). This node points to itself.' },

          { slowIdx:0, fastIdx:0, phase:'fast-hop1', result:null, desc:'fast HOP 1: val 1 → loops right back to val 1 (self-loop).' },
          { slowIdx:0, fastIdx:0, phase:'fast-hop2', result:null, desc:'fast HOP 2: val 1 → loops back to val 1 again.' },
          { slowIdx:0, fastIdx:0, phase:'slow-step', result:true, desc:'🎯 slow moves ONE node: val 1 → val 1 (self-loop). slow == fast! → return true.' },
        ],
      },
    ],
  },
  10: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6], n=3 → [1,2,2,3,5,6]',
        arr2: [2, 5, 6],
        m: 3,
        n: 3,
        expected: '[1,2,2,3,5,6]',
        steps: [
          { i:2, j:2, k:5, arr1:[1,2,3,0,0,0], phase:'init',    winner:null, desc:'Init: i=2 (val 3), j=2 (val 6), k=5 (last slot).' },

          { i:2, j:2, k:5, arr1:[1,2,3,0,0,0], phase:'compare', winner:'j', desc:'Compare nums1[i]=3 vs nums2[j]=6. 3 > 6? ❌ No → nums2 wins.' },
          { i:2, j:1, k:4, arr1:[1,2,3,0,0,6], phase:'write',   winner:'j', desc:'Write nums2[j]=6 into nums1[5]. j-- → 1, k-- → 4.' },

          { i:2, j:1, k:4, arr1:[1,2,3,0,0,6], phase:'compare', winner:'j', desc:'Compare nums1[i]=3 vs nums2[j]=5. 3 > 5? ❌ No → nums2 wins.' },
          { i:2, j:0, k:3, arr1:[1,2,3,0,5,6], phase:'write',   winner:'j', desc:'Write nums2[j]=5 into nums1[4]. j-- → 0, k-- → 3.' },

          { i:2, j:0, k:3, arr1:[1,2,3,0,5,6], phase:'compare', winner:'i', desc:'Compare nums1[i]=3 vs nums2[j]=2. 3 > 2? ✅ Yes → nums1 wins.' },
          { i:1, j:0, k:2, arr1:[1,2,3,3,5,6], phase:'write',   winner:'i', desc:'Write nums1[i]=3 into nums1[3]. i-- → 1, k-- → 2.' },

          { i:1, j:0, k:2, arr1:[1,2,3,3,5,6], phase:'compare', winner:'j', desc:'Compare nums1[i]=2 vs nums2[j]=2. 2 > 2? ❌ No (equal → nums2 wins by the else branch).' },
          { i:1, j:-1, k:1, arr1:[1,2,2,3,5,6], phase:'write',  winner:'j', desc:'Write nums2[j]=2 into nums1[2]. j-- → -1, k-- → 1.' },

          { i:1, j:-1, k:1, arr1:[1,2,2,3,5,6], phase:'exit', winner:null, desc:'j < 0 now → main loop condition fails. Exit main while loop.' },
          { i:1, j:-1, k:1, arr1:[1,2,2,3,5,6], phase:'skip-copy', winner:null, desc:'Leftover-copy loop checks j≥0 → false, so it doesn\'t run. nums1[0..1] were already correct and untouched.' },
          { i:1, j:-1, k:1, arr1:[1,2,2,3,5,6], phase:'done', winner:null, desc:'🎉 Merge complete: [1,2,2,3,5,6].' },
        ],
      },
      {
        label: 'Example 2 — nums1 empty',
        caption: 'nums1=[0], m=0, nums2=[1], n=1 → [1]',
        arr2: [1],
        m: 0,
        n: 1,
        expected: '[1]',
        steps: [
          { i:-1, j:0, k:0, arr1:[0], phase:'init', winner:null, desc:'Init: i=m-1=-1 (nums1 has no real elements!), j=0 (val 1), k=0.' },
          { i:-1, j:0, k:0, arr1:[0], phase:'exit', winner:null, desc:'Main loop condition needs i≥0 too — i is already -1, so the main loop never runs at all.' },
          { i:-1, j:0, k:0, arr1:[0], phase:'compare', winner:'j', desc:'Leftover-copy loop: j≥0 ✅ → copy directly from nums2.' },
          { i:-1, j:-1, k:-1, arr1:[1], phase:'write', winner:'j', desc:'Write nums2[j]=1 into nums1[0]. j-- → -1, k-- → -1.' },
          { i:-1, j:-1, k:-1, arr1:[1], phase:'done', winner:null, desc:'🎉 j < 0 → copy loop ends. Merge complete: [1].' },
        ],
      },
      {
        label: 'Example 3 — nums2 empty',
        caption: 'nums1=[1], m=1, nums2=[], n=0 → [1]',
        arr2: [],
        m: 1,
        n: 0,
        expected: '[1]',
        steps: [
          { i:0, j:-1, k:0, arr1:[1], phase:'init', winner:null, desc:'Init: i=0 (val 1), j=n-1=-1 (nums2 is empty!), k=0.' },
          { i:0, j:-1, k:0, arr1:[1], phase:'exit', winner:null, desc:'Main loop needs j≥0 — j is already -1, so it never runs.' },
          { i:0, j:-1, k:0, arr1:[1], phase:'skip-copy', winner:null, desc:'Leftover-copy loop also checks j≥0 → false, so it doesn\'t run either.' },
          { i:0, j:-1, k:0, arr1:[1], phase:'done', winner:null, desc:'🎉 Nothing to merge — nums1 was already fully correct. Result: [1].' },
        ],
      },
    ],
  },


  11: {
    tests: [
      {
        label: 'Example 1 — middle node',
        caption: 'list=[4,5,1,9], node=val 5 → [4,1,9]',
        nodes: [
          { idx: 0, val: 4 },
          { idx: 1, val: 5 },
          { idx: 2, val: 1 },
          { idx: 3, val: 9 },
        ],
        givenIdx: 1,
        expected: '[4,1,9]',
        steps: [
          { phase:'given', values:[4,5,1,9], givenIdx:1, nextIdx:null, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'We\'re given only `node` (val 5) — no access to head. We must fake a deletion using just this pointer.' },

          { phase:'peek', values:[4,5,1,9], givenIdx:1, nextIdx:2, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'Peek node->next->val = 1. This is the value we\'ll copy into node.' },

          { phase:'copy', values:[4,1,1,9], givenIdx:1, nextIdx:2, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'node->val = node->next->val → node\'s value overwritten with 1. Notice: two nodes now show "1" temporarily.' },

          { phase:'temp', values:[4,1,1,9], givenIdx:1, nextIdx:null, tempIdx:2, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'temp = node->next → temp now points at the duplicate (idx 2), which we\'re about to remove for real.' },

          { phase:'skip', values:[4,1,1,9], givenIdx:1, nextIdx:null, tempIdx:2, delIdx:null, links:[{from:0,to:1},{from:1,to:3,kind:'skip'},{from:1,to:2,kind:'fading'},{from:2,to:3,kind:'fading'}], desc:'node->next = node->next->next → node now points straight to idx 3, jumping clean over temp (idx 2).' },

          { phase:'delete', values:[4,1,1,9], givenIdx:1, nextIdx:null, tempIdx:2, delIdx:2, links:[{from:0,to:1},{from:1,to:3}], desc:'delete temp → node(idx 2) is freed from memory. It\'s truly gone.' },

          { phase:'done', values:[4,1,1,9], givenIdx:1, removedIdx:2, links:[{from:0,to:1},{from:1,to:3}], desc:'🎉 List is now [4,1,9]. We "deleted" node(val 5) by secretly deleting idx 2 instead, and disguising it with a copied value.' },
        ],
      },
      {
        label: 'Example 2 — second-to-last node',
        caption: 'list=[4,5,1,9], node=val 1 → [4,5,9]',
        nodes: [
          { idx: 0, val: 4 },
          { idx: 1, val: 5 },
          { idx: 2, val: 1 },
          { idx: 3, val: 9 },
        ],
        givenIdx: 2,
        expected: '[4,5,9]',
        steps: [
          { phase:'given', values:[4,5,1,9], givenIdx:2, nextIdx:null, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'We\'re given only `node` (val 1) — no access to head.' },

          { phase:'peek', values:[4,5,1,9], givenIdx:2, nextIdx:3, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'Peek node->next->val = 9 (the tail).' },

          { phase:'copy', values:[4,5,9,9], givenIdx:2, nextIdx:3, tempIdx:null, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'node->val = 9. node and its neighbor both show 9 temporarily.' },

          { phase:'temp', values:[4,5,9,9], givenIdx:2, nextIdx:null, tempIdx:3, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3}], desc:'temp = node->next → temp points at idx 3, the tail.' },

          { phase:'skip', values:[4,5,9,9], givenIdx:2, nextIdx:null, tempIdx:3, delIdx:null, links:[{from:0,to:1},{from:1,to:2},{from:2,to:3,kind:'fading'}], desc:'node->next = node->next->next = nullptr (idx 3 was the tail, so its next is null). node now points to NULL.' },

          { phase:'delete', values:[4,5,9,9], givenIdx:2, nextIdx:null, tempIdx:3, delIdx:3, links:[{from:0,to:1},{from:1,to:2}], desc:'delete temp → node(idx 3) is freed. node is now the new tail.' },

          { phase:'done', values:[4,5,9,9], givenIdx:2, removedIdx:3, links:[{from:0,to:1},{from:1,to:2}], desc:'🎉 List is now [4,5,9]. node(idx2) became the new tail after absorbing idx3\'s value.' },
        ],
      },
      {
        label: 'Example 3 — 2-node list',
        caption: 'list=[1,2], node=val 1 → [2]',
        nodes: [
          { idx: 0, val: 1 },
          { idx: 1, val: 2 },
        ],
        givenIdx: 0,
        expected: '[2]',
        steps: [
          { phase:'given', values:[1,2], givenIdx:0, nextIdx:null, tempIdx:null, delIdx:null, links:[{from:0,to:1}], desc:'We\'re given only `node` (val 1) — no access to head.' },

          { phase:'peek', values:[1,2], givenIdx:0, nextIdx:1, tempIdx:null, delIdx:null, links:[{from:0,to:1}], desc:'Peek node->next->val = 2.' },

          { phase:'copy', values:[2,2], givenIdx:0, nextIdx:1, tempIdx:null, delIdx:null, links:[{from:0,to:1}], desc:'node->val = 2. Both nodes show 2 temporarily.' },

          { phase:'temp', values:[2,2], givenIdx:0, nextIdx:null, tempIdx:1, delIdx:null, links:[{from:0,to:1}], desc:'temp = node->next → temp points at idx 1.' },

          { phase:'skip', values:[2,2], givenIdx:0, nextIdx:null, tempIdx:1, delIdx:null, links:[{from:0,to:1,kind:'fading'}], desc:'node->next = node->next->next = nullptr (idx1 was the tail). node now points to NULL.' },

          { phase:'delete', values:[2,2], givenIdx:0, nextIdx:null, tempIdx:1, delIdx:1, links:[], desc:'delete temp → node(idx1) is freed.' },

          { phase:'done', values:[2,2], givenIdx:0, removedIdx:1, links:[], desc:'🎉 List is now just [2]. Only one node remains, holding the copied value.' },
        ],
      },
    ],
  },


  12: {
    tests: [
      {
        label: 'Example 1',
        caption: 'root=[1,null,2,3] → [1,3,2]',
        // Tree shape:      1
        //                    \
        //                     2
        //                    /
        //                   3
        treeNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: null, right: 1 },
          { idx: 1, val: 2, x: 2, y: 1, left: 2,    right: null },
          { idx: 2, val: 3, x: 1, y: 2, left: null, right: null },
        ],
        expected: '[1,3,2]',
        steps: [
          { currIdx:0, stack:[], result:[], visitIdx:null, phase:'descend', desc:'curr = root (val 1). Push it, go left.' },
          { currIdx:null, stack:[0], result:[], visitIdx:null, phase:'descend', desc:'Pushed node(1) → stack=[1]. curr = node(1)->left = null. Can\'t go left further.' },

          { currIdx:null, stack:[0], result:[], visitIdx:0, phase:'visit', desc:'curr is null → pop stack top: node(1). Visit it!' },
          { currIdx:null, stack:[], result:[1], visitIdx:null, phase:'visit', desc:'result.push(1) → result=[1]. Stack now empty.' },

          { currIdx:1, stack:[], result:[1], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = node(2). Explore its left side.' },
          { currIdx:1, stack:[], result:[1], visitIdx:null, phase:'descend', desc:'Push node(2) → stack=[2]. curr = node(2)->left = node(3).' },
          { currIdx:2, stack:[1], result:[1], visitIdx:null, phase:'descend', desc:'curr = node(3). Push it, go left.' },
          { currIdx:null, stack:[1,2], result:[1], visitIdx:null, phase:'descend', desc:'Pushed node(3) → stack=[2,3]. curr = node(3)->left = null.' },

          { currIdx:null, stack:[1,2], result:[1], visitIdx:2, phase:'visit', desc:'curr is null → pop stack top: node(3). Visit it!' },
          { currIdx:null, stack:[1], result:[1,3], visitIdx:null, phase:'visit', desc:'result.push(3) → result=[1,3].' },

          { currIdx:null, stack:[1], result:[1,3], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = null (node 3 has no right child). Stack still has node(2).' },

          { currIdx:null, stack:[1], result:[1,3], visitIdx:1, phase:'visit', desc:'curr is null → pop stack top: node(2). Visit it!' },
          { currIdx:null, stack:[], result:[1,3,2], visitIdx:null, phase:'visit', desc:'result.push(2) → result=[1,3,2]. Stack now empty.' },

          { currIdx:null, stack:[], result:[1,3,2], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = null (node 2 has no right child).' },

          { currIdx:null, stack:[], result:[1,3,2], visitIdx:null, phase:'done', desc:'🎉 curr is null AND stack is empty → traversal complete! Result: [1,3,2].' },
        ],
      },
      {
        label: 'Example 2 — empty tree',
        caption: 'root=[] → []',
        treeNodes: [],
        expected: '[]',
        steps: [
          { currIdx:null, stack:[], result:[], visitIdx:null, phase:'done', desc:'root is null. curr starts null and stack starts empty → loop never runs. Result: [].' },
        ],
      },
      {
        label: 'Example 3 — balanced small tree',
        caption: 'root=[2,1,3] → [1,2,3]',
        // Tree shape:    2
        //               / \
        //              1   3
        treeNodes: [
          { idx: 0, val: 2, x: 1, y: 0, left: 1, right: 2 },
          { idx: 1, val: 1, x: 0, y: 1, left: null, right: null },
          { idx: 2, val: 3, x: 2, y: 1, left: null, right: null },
        ],
        expected: '[1,2,3]',
        steps: [
          { currIdx:0, stack:[], result:[], visitIdx:null, phase:'descend', desc:'curr = root (val 2). Push it, go left.' },
          { currIdx:1, stack:[0], result:[], visitIdx:null, phase:'descend', desc:'Pushed node(2) → stack=[2]. curr = node(2)->left = node(1).' },
          { currIdx:null, stack:[0,1], result:[], visitIdx:null, phase:'descend', desc:'Push node(1) → stack=[2,1]. curr = node(1)->left = null. Can\'t go left further.' },

          { currIdx:null, stack:[0,1], result:[], visitIdx:1, phase:'visit', desc:'curr is null → pop stack top: node(1). Visit it!' },
          { currIdx:null, stack:[0], result:[1], visitIdx:null, phase:'visit', desc:'result.push(1) → result=[1].' },

          { currIdx:null, stack:[0], result:[1], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = null (node 1 has no children). Stack still has node(2).' },

          { currIdx:null, stack:[0], result:[1], visitIdx:0, phase:'visit', desc:'curr is null → pop stack top: node(2), the root itself. Visit it!' },
          { currIdx:null, stack:[], result:[1,2], visitIdx:null, phase:'visit', desc:'result.push(2) → result=[1,2]. Stack now empty.' },

          { currIdx:2, stack:[], result:[1,2], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = node(3). Explore it.' },
          { currIdx:null, stack:[2], result:[1,2], visitIdx:null, phase:'descend', desc:'Push node(3) → stack=[3]. curr = node(3)->left = null.' },

          { currIdx:null, stack:[2], result:[1,2], visitIdx:2, phase:'visit', desc:'curr is null → pop stack top: node(3). Visit it!' },
          { currIdx:null, stack:[], result:[1,2,3], visitIdx:null, phase:'visit', desc:'result.push(3) → result=[1,2,3]. Stack now empty.' },

          { currIdx:null, stack:[], result:[1,2,3], visitIdx:null, phase:'descend', desc:'curr = poppedNode->right = null.' },

          { currIdx:null, stack:[], result:[1,2,3], visitIdx:null, phase:'done', desc:'🎉 curr is null AND stack is empty → done! Result: [1,2,3].' },
        ],
      },
    ],
  },
  13: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="proceeding" → \'d\'',
        arr: ['p','r','o','c','e','e','d','i','n','g'],
        luckyIdx: 6,
        expected: "'d'",
        steps: [
          { activeIdx:-1, phase:'read',  desc:'Read S = "proceeding" (10 characters, indices 0–9).' },
          { activeIdx:0,  phase:'count', desc:'1st letter → index 0 (\'p\').' },
          { activeIdx:1,  phase:'count', desc:'2nd letter → index 1 (\'r\').' },
          { activeIdx:2,  phase:'count', desc:'3rd letter → index 2 (\'o\').' },
          { activeIdx:3,  phase:'count', desc:'4th letter → index 3 (\'c\').' },
          { activeIdx:4,  phase:'count', desc:'5th letter → index 4 (\'e\').' },
          { activeIdx:5,  phase:'count', desc:'6th letter → index 5 (\'e\').' },
          { activeIdx:6,  phase:'lucky', desc:'7th letter → index 6 (\'d\'). This is Chef\'s lucky letter! 🍀' },
          { activeIdx:6,  phase:'done',  desc:'🎉 Print s[6] → \'d\'.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 's="helloworld" → \'o\'',
        arr: ['h','e','l','l','o','w','o','r','l','d'],
        luckyIdx: 6,
        expected: "'o'",
        steps: [
          { activeIdx:-1, phase:'read',  desc:'Read S = "helloworld" (10 characters, indices 0–9).' },
          { activeIdx:0,  phase:'count', desc:'1st letter → index 0 (\'h\').' },
          { activeIdx:1,  phase:'count', desc:'2nd letter → index 1 (\'e\').' },
          { activeIdx:2,  phase:'count', desc:'3rd letter → index 2 (\'l\').' },
          { activeIdx:3,  phase:'count', desc:'4th letter → index 3 (\'l\').' },
          { activeIdx:4,  phase:'count', desc:'5th letter → index 4 (\'o\').' },
          { activeIdx:5,  phase:'count', desc:'6th letter → index 5 (\'w\').' },
          { activeIdx:6,  phase:'lucky', desc:'7th letter → index 6 (\'o\'). This is Chef\'s lucky letter! 🍀' },
          { activeIdx:6,  phase:'done',  desc:'🎉 Print s[6] → \'o\'.' },
        ],
      },
      {
        label: 'Example 3',
        caption: 's="codechefdi" → \'e\' (first 10 chars used)',
        arr: ['c','o','d','e','c','h','e','f','d','i'],
        luckyIdx: 6,
        expected: "'e'",
        steps: [
          { activeIdx:-1, phase:'read',  desc:'Read S = "codechefdi" (10 characters, indices 0–9).' },
          { activeIdx:0,  phase:'count', desc:'1st letter → index 0 (\'c\').' },
          { activeIdx:1,  phase:'count', desc:'2nd letter → index 1 (\'o\').' },
          { activeIdx:2,  phase:'count', desc:'3rd letter → index 2 (\'d\').' },
          { activeIdx:3,  phase:'count', desc:'4th letter → index 3 (\'e\').' },
          { activeIdx:4,  phase:'count', desc:'5th letter → index 4 (\'c\').' },
          { activeIdx:5,  phase:'count', desc:'6th letter → index 5 (\'h\').' },
          { activeIdx:6,  phase:'lucky', desc:'7th letter → index 6 (\'e\'). This is Chef\'s lucky letter! 🍀' },
          { activeIdx:6,  phase:'done',  desc:'🎉 Print s[6] → \'e\'.' },
        ],
      },
    ],
  },

  14: {
    tests: [
      {
        label: 'Example 1',
        caption: 'height=[1,8,6,2,5,4,8,3,7] → 49',
        arr: [1, 8, 6, 2, 5, 4, 8, 3, 7],
        expected: '49',
        steps: [
        

          { fst:0, sec:8, area:null, marea:0, isNewMax:false, mover:null, desc:'Init: fst=0 (h=1), sec=8 (h=7). marea=0.' },

          { fst:0, sec:8, area:7, marea:7, isNewMax:true, mover:null, desc:'area = min(1,7) × (8-0) = 1×8 = 7. New marea = 7! 🎉' },

          { fst:0, sec:8, area:7, marea:7, isNewMax:false, mover:'fst', desc:'height[sec]=7 > height[fst]=1 → fst is the shorter wall. Move fst forward.' },

          { fst:1, sec:8, area:7, marea:7, isNewMax:false, mover:null, desc:'fst → 1 (h=8).' },

          { fst:1, sec:8, area:49, marea:49, isNewMax:true, mover:null, desc:'area = min(8,7) × (8-1) = 7×7 = 49. New marea = 49! 🎉' },

          { fst:1, sec:8, area:49, marea:49, isNewMax:false, mover:'sec', desc:'height[sec]=7 > height[fst]=8? ❌ No → sec is the shorter (or equal) wall. Move sec inward.' },

          { fst:1, sec:7, area:49, marea:49, isNewMax:false, mover:null, desc:'sec → 7 (h=3).' },

          { fst:1, sec:7, area:18, marea:49, isNewMax:false, mover:'sec', desc:'area = min(8,3)×(7-1) = 3×6 = 18. Not better than 49. height[sec]=3 > height[fst]=8? ❌ No → move sec inward.' },

          { fst:1, sec:6, area:18, marea:49, isNewMax:false, mover:null, desc:'sec → 6 (h=8).' },

          { fst:1, sec:6, area:40, marea:49, isNewMax:false, mover:'fst', desc:'area = min(8,8)×(6-1) = 8×5 = 40. Not better than 49. height[sec]=8 > height[fst]=8? ❌ No (equal) → move fst.' },

          { fst:2, sec:6, area:40, marea:49, isNewMax:false, mover:null, desc:'fst → 2 (h=6).' },

          { fst:2, sec:6, area:24, marea:49, isNewMax:false, mover:'fst', desc:'area = min(6,8)×(6-2) = 6×4 = 24. Not better. height[sec]=8 > height[fst]=6 → move fst.' },

          { fst:3, sec:6, area:24, marea:49, isNewMax:false, mover:null, desc:'fst → 3 (h=2).' },

          { fst:3, sec:6, area:6, marea:49, isNewMax:false, mover:'fst', desc:'area = min(2,8)×(6-3) = 2×3 = 6. Not better. height[sec]=8 > height[fst]=2 → move fst.' },

          { fst:4, sec:6, area:6, marea:49, isNewMax:false, mover:null, desc:'fst → 4 (h=5).' },

          { fst:4, sec:6, area:10, marea:49, isNewMax:false, mover:'fst', desc:'area = min(5,8)×(6-4) = 5×2 = 10. Not better. height[sec]=8 > height[fst]=5 → move fst.' },

          { fst:5, sec:6, area:10, marea:49, isNewMax:false, mover:null, desc:'fst → 5 (h=4).' },

          { fst:5, sec:6, area:4, marea:49, isNewMax:false, mover:'fst', desc:'area = min(4,8)×(6-5) = 4×1 = 4. Not better. height[sec]=8 > height[fst]=4 → move fst.' },

          { fst:6, sec:6, area:null, marea:49, isNewMax:false, mover:null, phase:'done', desc:'🎉 fst → 6. Now fst == sec, loop ends (sec > fst is false). Best container: index 1 (h=8) to index 8 (h=7) → area 49.' },

        ],
      },
      {
        label: 'Example 2 — all equal',
        caption: 'height=[1,1] → 1',
        arr: [1, 1],
        expected: '1',
        steps: [
          { fst:0, sec:1, area:null, marea:0, isNewMax:false, mover:null, desc:'Init: fst=0 (h=1), sec=1 (h=1). marea=0.' },
          { fst:0, sec:1, area:1, marea:1, isNewMax:true, mover:null, desc:'area = min(1,1)×(1-0) = 1×1 = 1. New marea = 1! 🎉' },
          { fst:0, sec:1, area:1, marea:1, isNewMax:false, mover:'sec', desc:'height[sec]=1 > height[fst]=1? ❌ No (equal) → move sec inward.' },
          { fst:0, sec:0, area:null, marea:1, isNewMax:false, mover:null, phase:'done', desc:'🎉 sec → 0. Now sec == fst, loop ends. Answer: 1.' },
        ],
      },
      {
        label: 'Example 3 — increasing heights',
        caption: 'height=[1,2,4,3] → 4',
        arr: [1, 2, 4, 3],
        expected: '4',
        steps: [
          { fst:0, sec:3, area:null, marea:0, isNewMax:false, mover:null, desc:'Init: fst=0 (h=1), sec=3 (h=3). marea=0.' },
          { fst:0, sec:3, area:3, marea:3, isNewMax:true, mover:null, desc:'area = min(1,3)×(3-0) = 1×3 = 3. New marea = 3! 🎉' },
          { fst:0, sec:3, area:3, marea:3, isNewMax:false, mover:'fst', desc:'height[sec]=3 > height[fst]=1 → move fst inward.' },
          { fst:1, sec:3, area:3, marea:3, isNewMax:false, mover:null, desc:'fst → 1 (h=2).' },

          { fst:1, sec:3, area:6, marea:6, isNewMax:true, mover:null, desc:'area = min(2,3)×(3-1) = 2×2 = 4. New marea = 4! 🎉' },
          { fst:1, sec:3, area:6, marea:6, isNewMax:false, mover:'fst', desc:'height[sec]=3 > height[fst]=2 → move fst inward.' },
          { fst:2, sec:3, area:6, marea:6, isNewMax:false, mover:null, desc:'fst → 2 (h=4).' },

          { fst:2, sec:3, area:3, marea:6, isNewMax:false, mover:'sec', desc:'area = min(4,3)×(3-2) = 3×1 = 3. Not better than 4. height[sec]=3 > height[fst]=4? ❌ No → move sec inward.' },
          { fst:2, sec:2, area:null, marea:4, isNewMax:false, mover:null, phase:'done', desc:'🎉 sec → 2. Now sec == fst, loop ends. Answer: 4.' },
        ],
      },
    ],
  },

  15: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="the sky is blue" → "blue is sky the"',
        raw: 'the sky is blue',
        expected: '"blue is sky the"',
        steps: [
          { phase:'split',   words:[],                          reversedWords:null, result:null, activeWord:null, desc:'Start splitting s = "the sky is blue" on whitespace.' },
          { phase:'split',   words:['the'],                      reversedWords:null, result:null, activeWord:'the', desc:'Found word: "the". words = ["the"].' },
          { phase:'split',   words:['the','sky'],                reversedWords:null, result:null, activeWord:'sky', desc:'Found word: "sky". words = ["the","sky"].' },
          { phase:'split',   words:['the','sky','is'],           reversedWords:null, result:null, activeWord:'is', desc:'Found word: "is". words = ["the","sky","is"].' },
          { phase:'split',   words:['the','sky','is','blue'],    reversedWords:null, result:null, activeWord:'blue', desc:'Found word: "blue". words = ["the","sky","is","blue"].' },
          { phase:'split-done', words:['the','sky','is','blue'], reversedWords:null, result:null, activeWord:null, desc:'No more input. Split complete: 4 words extracted.' },

          { phase:'reverse', words:['the','sky','is','blue'],   reversedWords:['blue','is','sky','the'], result:null, activeWord:null, desc:'Reverse the array → ["blue","is","sky","the"].' },

          { phase:'join',    words:['the','sky','is','blue'],   reversedWords:['blue','is','sky','the'], result:'blue', activeWord:'blue', desc:'Join: start with "blue".' },
          { phase:'join',    words:['the','sky','is','blue'],   reversedWords:['blue','is','sky','the'], result:'blue is', activeWord:'is', desc:'Append " is" → "blue is".' },
          { phase:'join',    words:['the','sky','is','blue'],   reversedWords:['blue','is','sky','the'], result:'blue is sky', activeWord:'sky', desc:'Append " sky" → "blue is sky".' },
          { phase:'join',    words:['the','sky','is','blue'],   reversedWords:['blue','is','sky','the'], result:'blue is sky the', activeWord:'the', desc:'Append " the" → "blue is sky the".' },

          { phase:'done', words:['the','sky','is','blue'], reversedWords:['blue','is','sky','the'], result:'blue is sky the', activeWord:null, desc:'🎉 Done! Result: "blue is sky the".' },
        ],
      },
      {
        label: 'Example 2 — extra spaces',
        caption: 's="  hello world  " → "world hello"',
        raw: '  hello world  ',
        expected: '"world hello"',
        steps: [
          { phase:'split',   words:[],                    reversedWords:null, result:null, activeWord:null, desc:'Start splitting s = "  hello world  " — note leading & trailing spaces, and this counts as extra whitespace to skip.' },
          { phase:'split-skip', words:[],                 reversedWords:null, result:null, activeWord:null, desc:'Leading spaces are automatically skipped — no empty word produced.' },
          { phase:'split',   words:['hello'],              reversedWords:null, result:null, activeWord:'hello', desc:'Found word: "hello". words = ["hello"].' },
          { phase:'split',   words:['hello','world'],      reversedWords:null, result:null, activeWord:'world', desc:'Found word: "world". words = ["hello","world"].' },
          { phase:'split-skip', words:['hello','world'],   reversedWords:null, result:null, activeWord:null, desc:'Trailing spaces are automatically skipped — no empty word produced.' },
          { phase:'split-done', words:['hello','world'],   reversedWords:null, result:null, activeWord:null, desc:'Split complete: 2 words extracted, spaces fully ignored.' },

          { phase:'reverse', words:['hello','world'],      reversedWords:['world','hello'], result:null, activeWord:null, desc:'Reverse the array → ["world","hello"].' },

          { phase:'join',    words:['hello','world'],      reversedWords:['world','hello'], result:'world', activeWord:'world', desc:'Join: start with "world".' },
          { phase:'join',    words:['hello','world'],      reversedWords:['world','hello'], result:'world hello', activeWord:'hello', desc:'Append " hello" → "world hello".' },

          { phase:'done', words:['hello','world'], reversedWords:['world','hello'], result:'world hello', activeWord:null, desc:'🎉 Done! Result: "world hello" — no leading/trailing/double spaces survived.' },
        ],
      },
      {
        label: 'Example 3 — multiple spaces between words',
        caption: 's="a good   example" → "example good a"',
        raw: 'a good   example',
        expected: '"example good a"',
        steps: [
          { phase:'split',   words:[],                          reversedWords:null, result:null, activeWord:null, desc:'Start splitting s = "a good   example" — 3 spaces sit between "good" and "example".' },
          { phase:'split',   words:['a'],                        reversedWords:null, result:null, activeWord:'a', desc:'Found word: "a". words = ["a"].' },
          { phase:'split',   words:['a','good'],                 reversedWords:null, result:null, activeWord:'good', desc:'Found word: "good". words = ["a","good"].' },
          { phase:'split-skip', words:['a','good'],               reversedWords:null, result:null, activeWord:null, desc:'The 3 spaces between "good" and "example" are treated as ONE separator, not 3 empty words.' },
          { phase:'split',   words:['a','good','example'],       reversedWords:null, result:null, activeWord:'example', desc:'Found word: "example". words = ["a","good","example"].' },
          { phase:'split-done', words:['a','good','example'],    reversedWords:null, result:null, activeWord:null, desc:'Split complete: 3 words — multiple spaces never created empty entries.' },

          { phase:'reverse', words:['a','good','example'],       reversedWords:['example','good','a'], result:null, activeWord:null, desc:'Reverse the array → ["example","good","a"].' },

          { phase:'join',    words:['a','good','example'],       reversedWords:['example','good','a'], result:'example', activeWord:'example', desc:'Join: start with "example".' },
          { phase:'join',    words:['a','good','example'],       reversedWords:['example','good','a'], result:'example good', activeWord:'good', desc:'Append " good" → "example good".' },
          { phase:'join',    words:['a','good','example'],       reversedWords:['example','good','a'], result:'example good a', activeWord:'a', desc:'Append " a" → "example good a".' },

          { phase:'done', words:['a','good','example'], reversedWords:['example','good','a'], result:'example good a', activeWord:null, desc:'🎉 Done! Result: "example good a" — single spaces only.' },
        ],
      },
    ],
  },
  16: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="daabcbaabcbc", part="abc" → "dab"',
        arr: ['d','a','a','b','c','b','a','a','b','c','b','c'],
        part: 'abc',
        expected: '"dab"',
        steps: [
          { i:-1, stack:[],                      match:null, desc:'Start scanning s = "daabcbaabcbc" with part = "abc" (k=3).' },

          { i:0, stack:['d'],                     match:false, desc:'Push \'d\' → stack=[d]. Only 1 char — too short to match k=3.' },
          { i:1, stack:['d','a'],                 match:false, desc:'Push \'a\' → stack=[d,a]. Still shorter than k=3.' },
          { i:2, stack:['d','a','a'],              match:false, desc:'Push \'a\' → stack=[d,a,a]. Last 3 = "daa" ≠ "abc".' },
          { i:3, stack:['d','a','a','b'],          match:false, desc:'Push \'b\' → stack=[d,a,a,b]. Last 3 = "aab" ≠ "abc".' },
          { i:4, stack:['d','a','a','b','c'],      match:true,  desc:'Push \'c\' → stack=[d,a,a,b,c]. Last 3 = "abc" ✅ MATCH!' },
          { i:4, stack:['d','a'],                  match:null,  desc:'Pop 3 chars → stack=[d,a]. That occurrence is erased.' },

          { i:5, stack:['d','a','b'],               match:false, desc:'Push \'b\' → stack=[d,a,b]. Last 3 = "dab" ≠ "abc".' },
          { i:6, stack:['d','a','b','a'],           match:false, desc:'Push \'a\' → stack=[d,a,b,a]. Last 3 = "aba" ≠ "abc".' },
          { i:7, stack:['d','a','b','a','a'],        match:false, desc:'Push \'a\' → stack=[d,a,b,a,a]. Last 3 = "baa" ≠ "abc".' },
          { i:8, stack:['d','a','b','a','a','b'],    match:false, desc:'Push \'b\' → stack=[d,a,b,a,a,b]. Last 3 = "aab" ≠ "abc".' },
          { i:9, stack:['d','a','b','a','a','b','c'], match:true, desc:'Push \'c\' → stack=[d,a,b,a,a,b,c]. Last 3 = "abc" ✅ MATCH!' },
          { i:9, stack:['d','a','b','a'],            match:null, desc:'Pop 3 chars → stack=[d,a,b,a]. Erased again.' },

        { i:10, stack:['d','a','b','a','b'], match:false, desc:'Push \'b\' → stack=[d,a,b,a,b]. Last 3 = "b,a,b" = "bab" ≠ "abc".' },
          { i:11, stack:['d','a','b','a','b','c'],   match:true,  desc:'Push \'c\' → stack=[d,a,b,a,b,c]. Last 3 = "abc" ✅ MATCH!' },
          { i:11, stack:['d','a','b'],               match:null, desc:'Pop 3 chars → stack=[d,a,b]. Erased.' },

          { i:-1, stack:['d','a','b'], match:null, phase:'done', desc:'🎉 All characters processed. Final stack: "dab".' },
        ],
      },
      {
        label: 'Example 2 — cascading matches',
        caption: 's="axxxxyyyyb", part="xy" → "ab"',
        arr: ['a','x','x','x','x','y','y','y','y','b'],
        part: 'xy',
        expected: '"ab"',
        steps: [
          { i:-1, stack:[], match:null, desc:'Start scanning s = "axxxxyyyyb" with part = "xy" (k=2).' },

          { i:0, stack:['a'],           match:false, desc:'Push \'a\' → stack=[a]. Too short to match k=2.' },
          { i:1, stack:['a','x'],        match:false, desc:'Push \'x\' → stack=[a,x]. Last 2 = "ax" ≠ "xy".' },
          { i:2, stack:['a','x','x'],     match:false, desc:'Push \'x\' → stack=[a,x,x]. Last 2 = "xx" ≠ "xy".' },
          { i:3, stack:['a','x','x','x'],  match:false, desc:'Push \'x\' → stack=[a,x,x,x]. Last 2 = "xx" ≠ "xy".' },
          { i:4, stack:['a','x','x','x','x'], match:false, desc:'Push \'x\' → stack=[a,x,x,x,x]. Last 2 = "xx" ≠ "xy".' },
          { i:5, stack:['a','x','x','x','x','y'], match:true, desc:'Push \'y\' → stack=[a,x,x,x,x,y]. Last 2 = "xy" ✅ MATCH!' },
          { i:5, stack:['a','x','x','x'], match:null, desc:'Pop 2 → stack=[a,x,x,x].' },

          { i:6, stack:['a','x','x','x','y'], match:true, desc:'Push \'y\' → stack=[a,x,x,x,y]. Last 2 = "xy" ✅ MATCH AGAIN — a new match was exposed by the previous pop!' },
          { i:6, stack:['a','x','x'], match:null, desc:'Pop 2 → stack=[a,x,x].' },

          { i:7, stack:['a','x','x','y'], match:true, desc:'Push \'y\' → stack=[a,x,x,y]. Last 2 = "xy" ✅ MATCH!' },
          { i:7, stack:['a','x'], match:null, desc:'Pop 2 → stack=[a,x].' },

          { i:8, stack:['a','x','y'], match:true, desc:'Push \'y\' → stack=[a,x,y]. Last 2 = "xy" ✅ MATCH!' },
          { i:8, stack:['a'], match:null, desc:'Pop 2 → stack=[a]. All 4 x\'s and 4 y\'s cascaded away one pair at a time.' },

          { i:9, stack:['a','b'], match:false, desc:'Push \'b\' → stack=[a,b]. Last 2 = "ab" ≠ "xy".' },

          { i:-1, stack:['a','b'], match:null, phase:'done', desc:'🎉 All characters processed. Final stack: "ab".' },
        ],
      },
      {
        label: 'Example 3 — no matches at all',
        caption: 's="abc", part="xyz" → "abc"',
        arr: ['a','b','c'],
        part: 'xyz',
        expected: '"abc"',
        steps: [
          { i:-1, stack:[], match:null, desc:'Start scanning s = "abc" with part = "xyz" (k=3).' },
          { i:0, stack:['a'],     match:false, desc:'Push \'a\' → stack=[a]. Too short.' },
          { i:1, stack:['a','b'], match:false, desc:'Push \'b\' → stack=[a,b]. Too short.' },
          { i:2, stack:['a','b','c'], match:false, desc:'Push \'c\' → stack=[a,b,c]. Last 3 = "abc" ≠ "xyz". No match.' },
          { i:-1, stack:['a','b','c'], match:null, phase:'done', desc:'🎉 part never occurs in s. Final stack: "abc" — unchanged.' },
        ],
      },
    ],
  },
  17: {
    tests: [
      {
        label: 'Example 1',
        caption: 'root=[1,null,2,3] → [1,2,3]',
        // Tree shape:      1
        //                    \
        //                     2
        //                    /
        //                   3
        treeNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: null, right: 1 },
          { idx: 1, val: 2, x: 2, y: 1, left: 2,    right: null },
          { idx: 2, val: 3, x: 1, y: 2, left: null, right: null },
        ],
        expected: '[1,2,3]',
        steps: [
          { phase:'init', stack:[0], result:[], visitIdx:null, desc:'root exists (val 1). Push it onto the stack.' },

          { phase:'pop', stack:[], result:[1], visitIdx:0, desc:'Pop top: node(1). Visit IMMEDIATELY (preorder visits before children) → result=[1].' },
          { phase:'push-right', stack:[1], result:[1], visitIdx:null, desc:'Push node(1)\'s right child: node(2).' },
          { phase:'push-left-skip', stack:[1], result:[1], visitIdx:null, desc:'node(1) has no left child — nothing to push.' },

          { phase:'pop', stack:[], result:[1,2], visitIdx:1, desc:'Pop top: node(2). Visit → result=[1,2].' },
          { phase:'push-right-skip', stack:[], result:[1,2], visitIdx:null, desc:'node(2) has no right child.' },
          { phase:'push-left', stack:[2], result:[1,2], visitIdx:null, desc:'Push node(2)\'s left child: node(3).' },

          { phase:'pop', stack:[], result:[1,2,3], visitIdx:2, desc:'Pop top: node(3). Visit → result=[1,2,3].' },
          { phase:'push-right-skip', stack:[], result:[1,2,3], visitIdx:null, desc:'node(3) has no right child.' },
          { phase:'push-left-skip', stack:[], result:[1,2,3], visitIdx:null, desc:'node(3) has no left child.' },

          { phase:'done', stack:[], result:[1,2,3], visitIdx:null, desc:'🎉 Stack empty → traversal complete! Result: [1,2,3].' },
        ],
      },
      {
        label: 'Example 2 — larger tree',
        caption: 'root=[1,2,3,4,5,null,8,null,null,6,7,9] → [1,2,4,5,6,7,3,8,9]',
        // Tree shape:
        //                1
        //              /   \
        //             2     3
        //            / \      \
        //           4   5      8
        //              / \    /
        //             6   7  9
        treeNodes: [
          { idx: 0, val: 1, x: 5, y: 0, left: 1, right: 6 },
          { idx: 1, val: 2, x: 1, y: 1, left: 2, right: 3 },
          { idx: 2, val: 4, x: 0, y: 2, left: null, right: null },
          { idx: 3, val: 5, x: 3, y: 2, left: 4, right: 5 },
          { idx: 4, val: 6, x: 2, y: 3, left: null, right: null },
          { idx: 5, val: 7, x: 4, y: 3, left: null, right: null },
          { idx: 6, val: 3, x: 6, y: 1, left: null, right: 7 },
          { idx: 7, val: 8, x: 8, y: 2, left: 8, right: null },
          { idx: 8, val: 9, x: 7, y: 3, left: null, right: null },
        ],
        expected: '[1,2,4,5,6,7,3,8,9]',
        steps: [
          { phase:'init', stack:[0], result:[], visitIdx:null, desc:'root exists (val 1). Push it onto the stack.' },

          { phase:'pop', stack:[], result:[1], visitIdx:0, desc:'Pop node(1). Visit → result=[1].' },
          { phase:'push-right', stack:[6], result:[1], visitIdx:null, desc:'Push node(1)\'s right child: node(3).' },
          { phase:'push-left', stack:[6,1], result:[1], visitIdx:null, desc:'Push node(1)\'s left child: node(2). It\'s now on top.' },

          { phase:'pop', stack:[6], result:[1,2], visitIdx:1, desc:'Pop node(2). Visit → result=[1,2].' },
          { phase:'push-right', stack:[6,3], result:[1,2], visitIdx:null, desc:'Push node(2)\'s right child: node(5).' },
          { phase:'push-left', stack:[6,3,2], result:[1,2], visitIdx:null, desc:'Push node(2)\'s left child: node(4). It\'s now on top.' },

          { phase:'pop', stack:[6,3], result:[1,2,4], visitIdx:2, desc:'Pop node(4). Visit → result=[1,2,4].' },
          { phase:'push-right-skip', stack:[6,3], result:[1,2,4], visitIdx:null, desc:'node(4) has no right child.' },
          { phase:'push-left-skip', stack:[6,3], result:[1,2,4], visitIdx:null, desc:'node(4) has no left child.' },

          { phase:'pop', stack:[6], result:[1,2,4,5], visitIdx:3, desc:'Pop node(5). Visit → result=[1,2,4,5].' },
          { phase:'push-right', stack:[6,5], result:[1,2,4,5], visitIdx:null, desc:'Push node(5)\'s right child: node(7).' },
          { phase:'push-left', stack:[6,5,4], result:[1,2,4,5], visitIdx:null, desc:'Push node(5)\'s left child: node(6). It\'s now on top.' },

          { phase:'pop', stack:[6,5], result:[1,2,4,5,6], visitIdx:4, desc:'Pop node(6). Visit → result=[1,2,4,5,6].' },
          { phase:'push-right-skip', stack:[6,5], result:[1,2,4,5,6], visitIdx:null, desc:'node(6) has no children.' },
          { phase:'push-left-skip', stack:[6,5], result:[1,2,4,5,6], visitIdx:null, desc:'node(6) has no left child.' },

          { phase:'pop', stack:[6], result:[1,2,4,5,6,7], visitIdx:5, desc:'Pop node(7). Visit → result=[1,2,4,5,6,7].' },
          { phase:'push-right-skip', stack:[6], result:[1,2,4,5,6,7], visitIdx:null, desc:'node(7) has no children.' },
          { phase:'push-left-skip', stack:[6], result:[1,2,4,5,6,7], visitIdx:null, desc:'node(7) has no left child.' },

          { phase:'pop', stack:[], result:[1,2,4,5,6,7,3], visitIdx:6, desc:'Pop node(3). Visit → result=[1,2,4,5,6,7,3]. Notice: the WHOLE left subtree of root finished before we even looked at node(3)\'s children.' },
          { phase:'push-right', stack:[7], result:[1,2,4,5,6,7,3], visitIdx:null, desc:'Push node(3)\'s right child: node(8).' },
          { phase:'push-left-skip', stack:[7], result:[1,2,4,5,6,7,3], visitIdx:null, desc:'node(3) has no left child.' },

          { phase:'pop', stack:[], result:[1,2,4,5,6,7,3,8], visitIdx:7, desc:'Pop node(8). Visit → result=[1,2,4,5,6,7,3,8].' },
          { phase:'push-right-skip', stack:[], result:[1,2,4,5,6,7,3,8], visitIdx:null, desc:'node(8) has no right child.' },
          { phase:'push-left', stack:[8], result:[1,2,4,5,6,7,3,8], visitIdx:null, desc:'Push node(8)\'s left child: node(9).' },

          { phase:'pop', stack:[], result:[1,2,4,5,6,7,3,8,9], visitIdx:8, desc:'Pop node(9). Visit → result=[1,2,4,5,6,7,3,8,9].' },
          { phase:'push-right-skip', stack:[], result:[1,2,4,5,6,7,3,8,9], visitIdx:null, desc:'node(9) has no children.' },
          { phase:'push-left-skip', stack:[], result:[1,2,4,5,6,7,3,8,9], visitIdx:null, desc:'node(9) has no left child.' },

          { phase:'done', stack:[], result:[1,2,4,5,6,7,3,8,9], visitIdx:null, desc:'🎉 Stack empty → done! Final result: [1,2,4,5,6,7,3,8,9].' },
        ],
      },
      {
        label: 'Example 3 — empty tree',
        caption: 'root=[] → []',
        treeNodes: [],
        expected: '[]',
        steps: [
          { phase:'done', stack:[], result:[], visitIdx:null, desc:'root is null → return [] immediately. The loop never runs.' },
        ],
      },
      {
        label: 'Example 4 — single node',
        caption: 'root=[1] → [1]',
        treeNodes: [
          { idx: 0, val: 1, x: 0, y: 0, left: null, right: null },
        ],
        expected: '[1]',
        steps: [
          { phase:'init', stack:[0], result:[], visitIdx:null, desc:'root exists (val 1). Push it onto the stack.' },
          { phase:'pop', stack:[], result:[1], visitIdx:0, desc:'Pop node(1). Visit → result=[1].' },
          { phase:'push-right-skip', stack:[], result:[1], visitIdx:null, desc:'node(1) has no right child.' },
          { phase:'push-left-skip', stack:[], result:[1], visitIdx:null, desc:'node(1) has no left child.' },
          { phase:'done', stack:[], result:[1], visitIdx:null, desc:'🎉 Stack empty → done! Result: [1].' },
        ],
      },
    ],
  },
  18: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[3,2,3] → 3',
        arr: [3, 2, 3],
        expected: '3',
        steps: [
          { i:-1, candidate:0, count:0, vote:null, crowned:false, desc:'Init: candidate=0, count=0.' },

          { i:0, candidate:0, count:0, vote:null, crowned:true,  desc:'i=0, num=3. count==0 → crown 3 as candidate!' },
          { i:0, candidate:3, count:0, vote:null, crowned:false, desc:'candidate is now 3.' },
          { i:0, candidate:3, count:1, vote:'match', crowned:false, desc:'num(3) == candidate(3) ✅ → count++ → count=1.' },

          { i:1, candidate:3, count:1, vote:null, crowned:false, desc:'i=1, num=2. count≠0, no crowning needed.' },
          { i:1, candidate:3, count:0, vote:'oppose', crowned:false, desc:'num(2) ≠ candidate(3) ❌ → count-- → count=0.' },

          { i:2, candidate:3, count:0, vote:null, crowned:true, desc:'i=2, num=3. count==0 → crown 3 as candidate again!' },
          { i:2, candidate:3, count:0, vote:null, crowned:false, desc:'candidate stays 3 (it was re-crowned with the same value).' },
          { i:2, candidate:3, count:1, vote:'match', crowned:false, desc:'num(3) == candidate(3) ✅ → count++ → count=1.' },

          { i:-1, candidate:3, count:1, vote:null, crowned:false, phase:'done', desc:'🎉 Scan complete. Surviving candidate: 3. Return 3.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'nums=[2,2,1,1,1,2,2] → 2',
        arr: [2, 2, 1, 1, 1, 2, 2],
        expected: '2',
        steps: [
          { i:-1, candidate:0, count:0, vote:null, crowned:false, desc:'Init: candidate=0, count=0.' },

          { i:0, candidate:0, count:0, vote:null, crowned:true,  desc:'i=0, num=2. count==0 → crown 2 as candidate!' },
          { i:0, candidate:2, count:0, vote:null, crowned:false, desc:'candidate is now 2.' },
          { i:0, candidate:2, count:1, vote:'match', crowned:false, desc:'num(2) == candidate(2) ✅ → count=1.' },

          { i:1, candidate:2, count:1, vote:null, crowned:false, desc:'i=1, num=2. count≠0.' },
          { i:1, candidate:2, count:2, vote:'match', crowned:false, desc:'num(2) == candidate(2) ✅ → count=2.' },

          { i:2, candidate:2, count:2, vote:null, crowned:false, desc:'i=2, num=1. count≠0.' },
          { i:2, candidate:2, count:1, vote:'oppose', crowned:false, desc:'num(1) ≠ candidate(2) ❌ → count=1.' },

          { i:3, candidate:2, count:1, vote:null, crowned:false, desc:'i=3, num=1. count≠0.' },
          { i:3, candidate:2, count:0, vote:'oppose', crowned:false, desc:'num(1) ≠ candidate(2) ❌ → count=0. Candidate 2 just got voted all the way down!' },

          { i:4, candidate:2, count:0, vote:null, crowned:true, desc:'i=4, num=1. count==0 → crown 1 as the NEW candidate! The lead has flipped.' },
          { i:4, candidate:1, count:0, vote:null, crowned:false, desc:'candidate is now 1.' },
          { i:4, candidate:1, count:1, vote:'match', crowned:false, desc:'num(1) == candidate(1) ✅ → count=1.' },

          { i:5, candidate:1, count:1, vote:null, crowned:false, desc:'i=5, num=2. count≠0.' },
          { i:5, candidate:1, count:0, vote:'oppose', crowned:false, desc:'num(2) ≠ candidate(1) ❌ → count=0. Candidate 1 voted out too!' },

          { i:6, candidate:1, count:0, vote:null, crowned:true, desc:'i=6, num=2. count==0 → crown 2 as candidate once more!' },
          { i:6, candidate:2, count:0, vote:null, crowned:false, desc:'candidate is now 2 again.' },
          { i:6, candidate:2, count:1, vote:'match', crowned:false, desc:'num(2) == candidate(2) ✅ → count=1.' },

          { i:-1, candidate:2, count:1, vote:null, crowned:false, phase:'done', desc:'🎉 Scan complete. Despite the lead flipping THREE times, the true majority element 2 survives at the very end. Return 2.' },
        ],
      },
      {
        label: 'Example 3 — single element',
        caption: 'nums=[7] → 7',
        arr: [7],
        expected: '7',
        steps: [
          { i:-1, candidate:0, count:0, vote:null, crowned:false, desc:'Init: candidate=0, count=0.' },
          { i:0, candidate:0, count:0, vote:null, crowned:true, desc:'i=0, num=7. count==0 → crown 7 as candidate!' },
          { i:0, candidate:7, count:0, vote:null, crowned:false, desc:'candidate is now 7.' },
          { i:0, candidate:7, count:1, vote:'match', crowned:false, desc:'num(7) == candidate(7) ✅ → count=1.' },
          { i:-1, candidate:7, count:1, vote:null, crowned:false, phase:'done', desc:'🎉 Scan complete. Single element is trivially the majority. Return 7.' },
        ],
      },
    ],
  },
  19: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[5,7,7,8,8,10], target=8 → [3,4]',
        arr: [5, 7, 7, 8, 8, 10],
        target: 8,
        expected: '[3,4]',
        steps: [
          // ── PASS 1: findFirst ──
          { pass:'first', low:0, high:5, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 1: findFirst. low=0, high=5, ans=-1.' },

          { pass:'first', low:0, high:5, mid:2, ans:-1, phase:'compare', desc:'mid = 0+(5-0)/2 = 2. nums[2]=7.' },
          { pass:'first', low:0, high:5, mid:2, ans:-1, phase:'less', desc:'nums[2]=7 < target(8) → search right. low = mid+1 = 3.' },
          { pass:'first', low:3, high:5, mid:null, ans:-1, phase:'narrow', desc:'low=3, high=5.' },

          { pass:'first', low:3, high:5, mid:4, ans:-1, phase:'compare', desc:'mid = 3+(5-3)/2 = 4. nums[4]=8.' },
          { pass:'first', low:3, high:5, mid:4, ans:4, phase:'match-left', desc:'nums[4]=8 == target! ✅ Save ans=4, but keep searching LEFT for an earlier 8. high = mid-1 = 3.' },
          { pass:'first', low:3, high:3, mid:null, ans:4, phase:'narrow', desc:'low=3, high=3.' },

          { pass:'first', low:3, high:3, mid:3, ans:4, phase:'compare', desc:'mid = 3+(3-3)/2 = 3. nums[3]=8.' },
          { pass:'first', low:3, high:3, mid:3, ans:3, phase:'match-left', desc:'nums[3]=8 == target! ✅ Even earlier match. Save ans=3, keep going left. high = mid-1 = 2.' },
          { pass:'first', low:3, high:2, mid:null, ans:3, phase:'narrow', desc:'low=3, high=2. low > high → loop ends.' },

          { pass:'first', low:3, high:2, mid:null, ans:3, phase:'pass-done', desc:'✅ findFirst complete. First occurrence of 8 is at index 3.' },

          // ── PASS 2: findLast ──
          { pass:'last', low:0, high:5, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 2: findLast. Reset low=0, high=5, ans=-1.' },

          { pass:'last', low:0, high:5, mid:2, ans:-1, phase:'compare', desc:'mid = 2. nums[2]=7.' },
          { pass:'last', low:0, high:5, mid:2, ans:-1, phase:'less', desc:'nums[2]=7 < target(8) → search right. low = mid+1 = 3.' },
          { pass:'last', low:3, high:5, mid:null, ans:-1, phase:'narrow', desc:'low=3, high=5.' },

          { pass:'last', low:3, high:5, mid:4, ans:-1, phase:'compare', desc:'mid = 3+(5-3)/2 = 4. nums[4]=8.' },
          { pass:'last', low:3, high:5, mid:4, ans:4, phase:'match-right', desc:'nums[4]=8 == target! ✅ Save ans=4, but keep searching RIGHT for a later 8. low = mid+1 = 5.' },
          { pass:'last', low:5, high:5, mid:null, ans:4, phase:'narrow', desc:'low=5, high=5.' },

          { pass:'last', low:5, high:5, mid:5, ans:4, phase:'compare', desc:'mid = 5+(5-5)/2 = 5. nums[5]=10.' },
          { pass:'last', low:5, high:5, mid:5, ans:4, phase:'greater', desc:'nums[5]=10 > target(8) → search left. high = mid-1 = 4.' },
          { pass:'last', low:5, high:4, mid:null, ans:4, phase:'narrow', desc:'low=5, high=4. low > high → loop ends.' },

          { pass:'last', low:5, high:4, mid:null, ans:4, phase:'pass-done', desc:'✅ findLast complete. Last occurrence of 8 is at index 4.' },

          { pass:'combine', low:null, high:null, mid:null, ans:null, phase:'done', desc:'🎉 Combine: [findFirst, findLast] = [3, 4].' },
        ],
      },
      {
        label: 'Example 2 — not found',
        caption: 'nums=[5,7,7,8,8,10], target=6 → [-1,-1]',
        arr: [5, 7, 7, 8, 8, 10],
        target: 6,
        expected: '[-1,-1]',
        steps: [
          // ── PASS 1: findFirst ──
          { pass:'first', low:0, high:5, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 1: findFirst. low=0, high=5, ans=-1.' },

          { pass:'first', low:0, high:5, mid:2, ans:-1, phase:'compare', desc:'mid=2. nums[2]=7.' },
          { pass:'first', low:0, high:5, mid:2, ans:-1, phase:'greater', desc:'nums[2]=7 > target(6) → search left. high = mid-1 = 1.' },
          { pass:'first', low:0, high:1, mid:null, ans:-1, phase:'narrow', desc:'low=0, high=1.' },

          { pass:'first', low:0, high:1, mid:0, ans:-1, phase:'compare', desc:'mid = 0+(1-0)/2 = 0. nums[0]=5.' },
          { pass:'first', low:0, high:1, mid:0, ans:-1, phase:'less', desc:'nums[0]=5 < target(6) → search right. low = mid+1 = 1.' },
          { pass:'first', low:1, high:1, mid:null, ans:-1, phase:'narrow', desc:'low=1, high=1.' },

          { pass:'first', low:1, high:1, mid:1, ans:-1, phase:'compare', desc:'mid=1. nums[1]=7.' },
          { pass:'first', low:1, high:1, mid:1, ans:-1, phase:'greater', desc:'nums[1]=7 > target(6) → search left. high = mid-1 = 0.' },
          { pass:'first', low:1, high:0, mid:null, ans:-1, phase:'narrow', desc:'low=1, high=0. low > high → loop ends. Target 6 never appeared in the array.' },

          { pass:'first', low:1, high:0, mid:null, ans:-1, phase:'pass-done', desc:'✅ findFirst complete. ans stays -1 — 6 was never found.' },

          // ── PASS 2: findLast ──
          { pass:'last', low:0, high:5, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 2: findLast. Reset low=0, high=5, ans=-1.' },

          { pass:'last', low:0, high:5, mid:2, ans:-1, phase:'compare', desc:'mid=2. nums[2]=7.' },
          { pass:'last', low:0, high:5, mid:2, ans:-1, phase:'greater', desc:'nums[2]=7 > target(6) → search left. high = mid-1 = 1.' },
          { pass:'last', low:0, high:1, mid:null, ans:-1, phase:'narrow', desc:'low=0, high=1.' },

          { pass:'last', low:0, high:1, mid:0, ans:-1, phase:'compare', desc:'mid=0. nums[0]=5.' },
          { pass:'last', low:0, high:1, mid:0, ans:-1, phase:'less', desc:'nums[0]=5 < target(6) → search right. low = mid+1 = 1.' },
          { pass:'last', low:1, high:1, mid:null, ans:-1, phase:'narrow', desc:'low=1, high=1.' },

          { pass:'last', low:1, high:1, mid:1, ans:-1, phase:'compare', desc:'mid=1. nums[1]=7.' },
          { pass:'last', low:1, high:1, mid:1, ans:-1, phase:'greater', desc:'nums[1]=7 > target(6) → search left. high = mid-1 = 0.' },
          { pass:'last', low:1, high:0, mid:null, ans:-1, phase:'narrow', desc:'low=1, high=0. Loop ends.' },

          { pass:'last', low:1, high:0, mid:null, ans:-1, phase:'pass-done', desc:'✅ findLast complete. ans stays -1.' },

          { pass:'combine', low:null, high:null, mid:null, ans:null, phase:'done', desc:'🎉 Combine: [findFirst, findLast] = [-1, -1]. Target not in array.' },
        ],
      },
      {
        label: 'Example 3 — empty array',
        caption: 'nums=[], target=0 → [-1,-1]',
        arr: [],
        target: 0,
        expected: '[-1,-1]',
        steps: [
          { pass:'first', low:0, high:-1, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 1: findFirst. Array is empty → low=0, high=-1.' },
          { pass:'first', low:0, high:-1, mid:null, ans:-1, phase:'pass-done', desc:'✅ low > high immediately — loop never runs. findFirst returns -1.' },

          { pass:'last', low:0, high:-1, mid:null, ans:-1, phase:'init', desc:'🔍 Pass 2: findLast. Same situation — low=0, high=-1.' },
          { pass:'last', low:0, high:-1, mid:null, ans:-1, phase:'pass-done', desc:'✅ Loop never runs. findLast returns -1.' },

          { pass:'combine', low:null, high:null, mid:null, ans:null, phase:'done', desc:'🎉 Combine: [-1, -1]. Nothing to find in an empty array.' },
        ],
      },
    ],
  },
  20: {
    tests: [
      {
        label: 'Example 1',
        caption: 's="bcabc" → "abc"',
        arr: ['b','c','a','b','c'],
        expected: '"abc"',
        steps: [
          { i:-1, char:null, stack:[], lastIndex:{a:2,b:3,c:4}, phase:'init', popChar:null, desc:'Precompute last occurrence: a→2, b→3, c→4.' },

          { i:0, char:'b', stack:[], phase:'check', popChar:null, desc:'i=0, char=\'b\'. Not in stack.' },
          { i:0, char:'b', stack:['b'], phase:'push', popChar:null, desc:'Stack is empty, nothing to compare. Push \'b\'. stack=[b].' },

          { i:1, char:'c', stack:['b'], phase:'check', popChar:null, desc:'i=1, char=\'c\'. Not in stack.' },
          { i:1, char:'c', stack:['b'], phase:'compare', popChar:null, desc:'Top \'b\' > \'c\'? ❌ No → no pop needed.' },
          { i:1, char:'c', stack:['b','c'], phase:'push', popChar:null, desc:'Push \'c\'. stack=[b,c].' },

          { i:2, char:'a', stack:['b','c'], phase:'check', popChar:null, desc:'i=2, char=\'a\'. Not in stack.' },
          { i:2, char:'a', stack:['b','c'], phase:'compare', popChar:'c', desc:'Top \'c\' > \'a\'? ✅ Yes. Does c reappear later? lastIndex[c]=4 > i(2)? ✅ Yes → safe to pop!' },
          { i:2, char:'a', stack:['b'], phase:'pop', popChar:'c', desc:'Pop \'c\'. stack=[b]. (c will come back at index 4.)' },
          { i:2, char:'a', stack:['b'], phase:'compare', popChar:'b', desc:'Top \'b\' > \'a\'? ✅ Yes. Does b reappear later? lastIndex[b]=3 > i(2)? ✅ Yes → safe to pop!' },
          { i:2, char:'a', stack:[], phase:'pop', popChar:'b', desc:'Pop \'b\'. stack=[]. (b will come back at index 3.)' },
          { i:2, char:'a', stack:[], phase:'compare', popChar:null, desc:'Stack is now empty — nothing left to compare.' },
          { i:2, char:'a', stack:['a'], phase:'push', popChar:null, desc:'Push \'a\'. stack=[a].' },

          { i:3, char:'b', stack:['a'], phase:'check', popChar:null, desc:'i=3, char=\'b\'. Not in stack.' },
          { i:3, char:'b', stack:['a'], phase:'compare', popChar:null, desc:'Top \'a\' > \'b\'? ❌ No → no pop.' },
          { i:3, char:'b', stack:['a','b'], phase:'push', popChar:null, desc:'Push \'b\'. stack=[a,b]. (This is the \'b\' we let go earlier, now back in a better spot!)' },

          { i:4, char:'c', stack:['a','b'], phase:'check', popChar:null, desc:'i=4, char=\'c\'. Not in stack.' },
          { i:4, char:'c', stack:['a','b'], phase:'compare', popChar:null, desc:'Top \'b\' > \'c\'? ❌ No → no pop.' },
          { i:4, char:'c', stack:['a','b','c'], phase:'push', popChar:null, desc:'Push \'c\'. stack=[a,b,c].' },

          { i:-1, char:null, stack:['a','b','c'], phase:'done', popChar:null, desc:'🎉 Done! Result: "abc" — smallest possible ordering with each letter exactly once.' },
        ],
      },
      {
        label: 'Example 2 — trickier case',
        caption: 's="cbacdcbc" → "acdb"',
        arr: ['c','b','a','c','d','c','b','c'],
        expected: '"acdb"',
        steps: [
          { i:-1, char:null, stack:[], lastIndex:{a:2,b:6,c:7,d:4}, phase:'init', popChar:null, desc:'Precompute last occurrence: a→2, b→6, c→7, d→4.' },

          { i:0, char:'c', stack:[], phase:'check', popChar:null, desc:'i=0, char=\'c\'. Not in stack.' },
          { i:0, char:'c', stack:['c'], phase:'push', popChar:null, desc:'Push \'c\'. stack=[c].' },

          { i:1, char:'b', stack:['c'], phase:'check', popChar:null, desc:'i=1, char=\'b\'. Not in stack.' },
          { i:1, char:'b', stack:['c'], phase:'compare', popChar:'c', desc:'Top \'c\' > \'b\'? ✅ Yes. lastIndex[c]=7 > i(1)? ✅ Yes → safe to pop!' },
          { i:1, char:'b', stack:[], phase:'pop', popChar:'c', desc:'Pop \'c\'. stack=[]. (c comes back at index 7.)' },
          { i:1, char:'b', stack:['b'], phase:'push', popChar:null, desc:'Stack empty. Push \'b\'. stack=[b].' },

          { i:2, char:'a', stack:['b'], phase:'check', popChar:null, desc:'i=2, char=\'a\'. Not in stack.' },
          { i:2, char:'a', stack:['b'], phase:'compare', popChar:'b', desc:'Top \'b\' > \'a\'? ✅ Yes. lastIndex[b]=6 > i(2)? ✅ Yes → safe to pop!' },
          { i:2, char:'a', stack:[], phase:'pop', popChar:'b', desc:'Pop \'b\'. stack=[]. (b comes back at index 6.)' },
          { i:2, char:'a', stack:['a'], phase:'push', popChar:null, desc:'Stack empty. Push \'a\'. stack=[a].' },

          { i:3, char:'c', stack:['a'], phase:'check', popChar:null, desc:'i=3, char=\'c\'. Not in stack.' },
          { i:3, char:'c', stack:['a'], phase:'compare', popChar:null, desc:'Top \'a\' > \'c\'? ❌ No → no pop.' },
          { i:3, char:'c', stack:['a','c'], phase:'push', popChar:null, desc:'Push \'c\'. stack=[a,c].' },

          { i:4, char:'d', stack:['a','c'], phase:'check', popChar:null, desc:'i=4, char=\'d\'. Not in stack.' },
          { i:4, char:'d', stack:['a','c'], phase:'compare', popChar:null, desc:'Top \'c\' > \'d\'? ❌ No → no pop.' },
          { i:4, char:'d', stack:['a','c','d'], phase:'push', popChar:null, desc:'Push \'d\'. stack=[a,c,d].' },

          { i:5, char:'c', stack:['a','c','d'], phase:'skip', popChar:null, desc:'i=5, char=\'c\'. Already in stack! ⏭️ Skip entirely — we never want two c\'s.' },

          { i:6, char:'b', stack:['a','c','d'], phase:'check', popChar:null, desc:'i=6, char=\'b\'. Not in stack.' },
          { i:6, char:'b', stack:['a','c','d'], phase:'compare', popChar:'d', desc:'Top \'d\' > \'b\'? ✅ Yes. But lastIndex[d]=4 > i(6)? ❌ No — d never comes back! Cannot pop.' },
          { i:6, char:'b', stack:['a','c','d','b'], phase:'push', popChar:null, desc:'Must keep \'d\' (it\'s gone for good otherwise). Push \'b\' as-is. stack=[a,c,d,b].' },

          { i:7, char:'c', stack:['a','c','d','b'], phase:'skip', popChar:null, desc:'i=7, char=\'c\'. Already in stack! ⏭️ Skip.' },

          { i:-1, char:null, stack:['a','c','d','b'], phase:'done', popChar:null, desc:'🎉 Done! Result: "acdb". Notice \'d\' stayed even though \'b\' < \'d\', because d never reappears — popping it would have lost it forever.' },
        ],
      },
      {
        label: 'Example 3 — mid-string revisit',
        caption: 's="abacb" → "abc"',
        arr: ['a','b','a','c','b'],
        expected: '"abc"',
        steps: [
          { i:-1, char:null, stack:[], lastIndex:{a:2,b:4,c:3}, phase:'init', popChar:null, desc:'Precompute last occurrence: a→2, b→4, c→3.' },

          { i:0, char:'a', stack:[], phase:'check', popChar:null, desc:'i=0, char=\'a\'. Not in stack.' },
          { i:0, char:'a', stack:['a'], phase:'push', popChar:null, desc:'Push \'a\'. stack=[a].' },

          { i:1, char:'b', stack:['a'], phase:'check', popChar:null, desc:'i=1, char=\'b\'. Not in stack.' },
          { i:1, char:'b', stack:['a'], phase:'compare', popChar:null, desc:'Top \'a\' > \'b\'? ❌ No → no pop.' },
          { i:1, char:'b', stack:['a','b'], phase:'push', popChar:null, desc:'Push \'b\'. stack=[a,b].' },

          { i:2, char:'a', stack:['a','b'], phase:'skip', popChar:null, desc:'i=2, char=\'a\'. Already in stack! ⏭️ Skip.' },

          { i:3, char:'c', stack:['a','b'], phase:'check', popChar:null, desc:'i=3, char=\'c\'. Not in stack.' },
          { i:3, char:'c', stack:['a','b'], phase:'compare', popChar:null, desc:'Top \'b\' > \'c\'? ❌ No → no pop.' },
          { i:3, char:'c', stack:['a','b','c'], phase:'push', popChar:null, desc:'Push \'c\'. stack=[a,b,c].' },

          { i:4, char:'b', stack:['a','b','c'], phase:'skip', popChar:null, desc:'i=4, char=\'b\'. Already in stack! ⏭️ Skip.' },

          { i:-1, char:null, stack:['a','b','c'], phase:'done', popChar:null, desc:'🎉 Done! Result: "abc".' },
        ],
      },
    ],
  },
  21: {
    tests: [
      {
        label: 'Example 1',
        caption: 'adjList=[[2,4],[1,3],[2,4],[1,3]] → 4-node cycle',
        graphNodes: [
          { id: 1, x: 0, y: 0 },
          { id: 2, x: 1, y: 0 },
          { id: 3, x: 1, y: 1 },
          { id: 4, x: 0, y: 1 },
        ],
        graphEdges: [[1,2],[2,3],[3,4],[4,1]],
        expected: '[[2,4],[1,3],[2,4],[1,3]]',
        steps: [
          { phase:'init', callStack:[], status:{1:'pending',2:'pending',3:'pending',4:'pending'}, activeNode:null, targetNode:null, cloneEdges:[], desc:'Start: cloneGraph(node 1) is called.' },

          { phase:'call-new', callStack:[1], status:{1:'cloning',2:'pending',3:'pending',4:'pending'}, activeNode:1, targetNode:null, cloneEdges:[], desc:'clone(1): not yet in map → create copy1, store map[1]=copy1. Now process node 1\'s neighbors [2,4].' },

          { phase:'call-new', callStack:[1,2], status:{1:'cloning',2:'cloning',3:'pending',4:'pending'}, activeNode:2, targetNode:null, cloneEdges:[], desc:'Node 1, neighbor 2: clone(2) called — not yet in map → create copy2. Process node 2\'s neighbors [1,3].' },

          { phase:'call-visited', callStack:[1,2], status:{1:'cloning',2:'cloning',3:'pending',4:'pending'}, activeNode:2, targetNode:1, cloneEdges:[], desc:'Node 2, neighbor 1: clone(1) called — 1 IS already in map! Return existing copy1 immediately. This is what stops the infinite cycle.' },

          { phase:'link', callStack:[1,2], status:{1:'cloning',2:'cloning',3:'pending',4:'pending'}, activeNode:2, targetNode:1, cloneEdges:[[1,2]], desc:'Link: copy2\'s neighbor list gets copy1. Edge 1↔2 now exists in the clone graph.' },

          { phase:'call-new', callStack:[1,2,3], status:{1:'cloning',2:'cloning',3:'cloning',4:'pending'}, activeNode:3, targetNode:null, cloneEdges:[[1,2]], desc:'Node 2, neighbor 3: clone(3) called — not yet in map → create copy3. Process node 3\'s neighbors [2,4].' },

          { phase:'call-visited', callStack:[1,2,3], status:{1:'cloning',2:'cloning',3:'cloning',4:'pending'}, activeNode:3, targetNode:2, cloneEdges:[[1,2]], desc:'Node 3, neighbor 2: clone(2) called — already in map! Return copy2.' },

          { phase:'link', callStack:[1,2,3], status:{1:'cloning',2:'cloning',3:'cloning',4:'pending'}, activeNode:3, targetNode:2, cloneEdges:[[1,2],[2,3]], desc:'Link: copy3\'s neighbor list gets copy2. Edge 2↔3 now exists.' },

          { phase:'call-new', callStack:[1,2,3,4], status:{1:'cloning',2:'cloning',3:'cloning',4:'cloning'}, activeNode:4, targetNode:null, cloneEdges:[[1,2],[2,3]], desc:'Node 3, neighbor 4: clone(4) called — not yet in map → create copy4. Process node 4\'s neighbors [1,3].' },

          { phase:'call-visited', callStack:[1,2,3,4], status:{1:'cloning',2:'cloning',3:'cloning',4:'cloning'}, activeNode:4, targetNode:1, cloneEdges:[[1,2],[2,3]], desc:'Node 4, neighbor 1: clone(1) called — already in map! Return copy1.' },

          { phase:'link', callStack:[1,2,3,4], status:{1:'cloning',2:'cloning',3:'cloning',4:'cloning'}, activeNode:4, targetNode:1, cloneEdges:[[1,2],[2,3],[1,4]], desc:'Link: copy4\'s neighbor list gets copy1. Edge 1↔4 now exists.' },

          { phase:'call-visited', callStack:[1,2,3,4], status:{1:'cloning',2:'cloning',3:'cloning',4:'cloning'}, activeNode:4, targetNode:3, cloneEdges:[[1,2],[2,3],[1,4]], desc:'Node 4, neighbor 3: clone(3) called — already in map! Return copy3.' },

          { phase:'link', callStack:[1,2,3,4], status:{1:'cloning',2:'cloning',3:'cloning',4:'cloning'}, activeNode:4, targetNode:3, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Link: copy4\'s neighbor list gets copy3. Edge 3↔4 now exists. Node 4 has no more neighbors!' },

          { phase:'return', callStack:[1,2,3], status:{1:'cloning',2:'cloning',3:'cloning',4:'done'}, activeNode:3, targetNode:4, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'clone(4) is fully done — pop it off the call stack, return copy4 back to node 3\'s loop.' },

          { phase:'link', callStack:[1,2,3], status:{1:'cloning',2:'cloning',3:'cloning',4:'done'}, activeNode:3, targetNode:4, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Back in node 3: link copy3\'s neighbor list gets copy4 (edge 3↔4 already existed — this completes the mutual reference). Node 3 has no more neighbors!' },

          { phase:'return', callStack:[1,2], status:{1:'cloning',2:'cloning',3:'done',4:'done'}, activeNode:2, targetNode:3, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'clone(3) is fully done — pop it off the call stack, return copy3 back to node 2\'s loop.' },

          { phase:'link', callStack:[1,2], status:{1:'cloning',2:'cloning',3:'done',4:'done'}, activeNode:2, targetNode:3, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Back in node 2: link copy2\'s neighbor list gets copy3 (edge 2↔3 already existed). Node 2 has no more neighbors!' },

          { phase:'return', callStack:[1], status:{1:'cloning',2:'done',3:'done',4:'done'}, activeNode:1, targetNode:2, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'clone(2) is fully done — pop it off the call stack, return copy2 back to node 1\'s loop.' },

          { phase:'link', callStack:[1], status:{1:'cloning',2:'done',3:'done',4:'done'}, activeNode:1, targetNode:2, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Back in node 1: link copy1\'s neighbor list gets copy2 (edge 1↔2 already existed).' },

          { phase:'call-visited', callStack:[1], status:{1:'cloning',2:'done',3:'done',4:'done'}, activeNode:1, targetNode:4, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Node 1, neighbor 4: clone(4) called — already in map! Return copy4.' },

          { phase:'link', callStack:[1], status:{1:'cloning',2:'done',3:'done',4:'done'}, activeNode:1, targetNode:4, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'Link: copy1\'s neighbor list gets copy4 (edge 1↔4 already existed). Node 1 has no more neighbors!' },

          { phase:'done', callStack:[], status:{1:'done',2:'done',3:'done',4:'done'}, activeNode:null, targetNode:null, cloneEdges:[[1,2],[2,3],[1,4],[3,4]], desc:'🎉 clone(1) fully done — call stack empty. Every node has been deep-copied with matching neighbor connections!' },
        ],
      },
      {
        label: 'Example 2 — single node, no neighbors',
        caption: 'adjList=[[]] → single isolated node',
        graphNodes: [
          { id: 1, x: 0, y: 0 },
        ],
        graphEdges: [],
        expected: '[[]]',
        steps: [
          { phase:'init', callStack:[], status:{1:'pending'}, activeNode:null, targetNode:null, cloneEdges:[], desc:'Start: cloneGraph(node1). Node 1 has an empty neighbor list.' },
          { phase:'call-new', callStack:[1], status:{1:'cloning'}, activeNode:1, targetNode:null, cloneEdges:[], desc:'clone(1): not in map → create copy1. Node 1 has NO neighbors — the loop body never executes.' },
          { phase:'done', callStack:[], status:{1:'done'}, activeNode:null, targetNode:null, cloneEdges:[], desc:'🎉 clone(1) returns immediately with no linking needed. Result: one cloned node, zero edges.' },
        ],
      },
      {
        label: 'Example 3 — empty graph',
        caption: 'adjList=[] → node is null',
        graphNodes: [],
        graphEdges: [],
        expected: '[]',
        steps: [
          { phase:'done', callStack:[], status:{}, activeNode:null, targetNode:null, cloneEdges:[], desc:'Input node is null → cloneGraph returns null immediately. There is nothing to clone.' },
        ],
      },
    ],
  },
  22: {
    tests: [
      {
        label: 'Example 1 — identical trees',
        caption: 'p=[1,2,3], q=[1,2,3] → true',
        // Both trees:      1
        //                 / \
        //                2   3
        pNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: 1, right: 2 },
          { idx: 1, val: 2, x: 0, y: 1, left: null, right: null },
          { idx: 2, val: 3, x: 2, y: 1, left: null, right: null },
        ],
        qNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: 1, right: 2 },
          { idx: 1, val: 2, x: 0, y: 1, left: null, right: null },
          { idx: 2, val: 3, x: 2, y: 1, left: null, right: null },
        ],
        expected: 'true',
        steps: [
          { pIdx:0, qIdx:0, phase:'compare-both-exist', result:null, desc:'Compare root p(1) vs q(1). Both exist.' },
          { pIdx:0, qIdx:0, phase:'compare-values', result:null, desc:'p.val(1) == q.val(1) ✅ → values match. Recurse into left subtrees.' },

          { pIdx:1, qIdx:1, phase:'compare-both-exist', result:null, desc:'Compare p.left(2) vs q.left(2). Both exist.' },
          { pIdx:1, qIdx:1, phase:'compare-values', result:null, desc:'p.val(2) == q.val(2) ✅ → match. Recurse further left.' },

          { pIdx:null, qIdx:null, phase:'both-null', result:true, desc:'p.left.left = null, q.left.left = null. Both null → match! Return true.' },
          { pIdx:null, qIdx:null, phase:'both-null', result:true, desc:'p.left.right = null, q.left.right = null. Both null → match! Return true.' },
          { pIdx:1, qIdx:1, phase:'subtree-done', result:true, desc:'✅ Node 2\'s whole subtree matches (left AND right both true). Bubble true back up.' },

          { pIdx:2, qIdx:2, phase:'compare-both-exist', result:null, desc:'Back at root — now compare p.right(3) vs q.right(3). Both exist.' },
          { pIdx:2, qIdx:2, phase:'compare-values', result:null, desc:'p.val(3) == q.val(3) ✅ → match.' },

          { pIdx:null, qIdx:null, phase:'both-null', result:true, desc:'p.right.left = null, q.right.left = null. Both null → match!' },
          { pIdx:null, qIdx:null, phase:'both-null', result:true, desc:'p.right.right = null, q.right.right = null. Both null → match!' },
          { pIdx:2, qIdx:2, phase:'subtree-done', result:true, desc:'✅ Node 3\'s subtree matches too.' },

          { pIdx:0, qIdx:0, phase:'done', result:true, desc:'🎉 Root\'s left AND right subtrees both matched → the trees are identical! Return true.' },
        ],
      },
      {
        label: 'Example 2 — different shapes',
        caption: 'p=[1,2], q=[1,null,2] → false',
        // p:      1          q:      1
        //        /                    \
        //       2                      2
        pNodes: [
          { idx: 0, val: 1, x: 0, y: 0, left: 1, right: null },
          { idx: 1, val: 2, x: -1, y: 1, left: null, right: null },
        ],
        qNodes: [
          { idx: 0, val: 1, x: 0, y: 0, left: null, right: 1 },
          { idx: 1, val: 2, x: 1, y: 1, left: null, right: null },
        ],
        expected: 'false',
        steps: [
          { pIdx:0, qIdx:0, phase:'compare-both-exist', result:null, desc:'Compare root p(1) vs q(1). Both exist.' },
          { pIdx:0, qIdx:0, phase:'compare-values', result:null, desc:'p.val(1) == q.val(1) ✅ → match. Recurse into left subtrees.' },

          { pIdx:1, qIdx:null, phase:'one-null', result:false, desc:'Compare p.left(2) vs q.left(null). p has a node here, q does NOT — shapes differ! Return false immediately.' },

          { pIdx:0, qIdx:0, phase:'done', result:false, desc:'🎉 Left subtree comparison already returned false — no need to even check the right side (short-circuit &&). Trees are NOT the same. Return false.' },
        ],
      },
      {
        label: 'Example 3 — same shape, different values',
        caption: 'p=[1,2,1], q=[1,1,2] → false',
        // p:      1          q:      1
        //        / \                / \
        //       2   1              1   2
        pNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: 1, right: 2 },
          { idx: 1, val: 2, x: 0, y: 1, left: null, right: null },
          { idx: 2, val: 1, x: 2, y: 1, left: null, right: null },
        ],
        qNodes: [
          { idx: 0, val: 1, x: 1, y: 0, left: 1, right: 2 },
          { idx: 1, val: 1, x: 0, y: 1, left: null, right: null },
          { idx: 2, val: 2, x: 2, y: 1, left: null, right: null },
        ],
        expected: 'false',
        steps: [
          { pIdx:0, qIdx:0, phase:'compare-both-exist', result:null, desc:'Compare root p(1) vs q(1). Both exist.' },
          { pIdx:0, qIdx:0, phase:'compare-values', result:null, desc:'p.val(1) == q.val(1) ✅ → match. Recurse into left subtrees.' },

          { pIdx:1, qIdx:1, phase:'compare-both-exist', result:null, desc:'Compare p.left(2) vs q.left(1). Both exist.' },
          { pIdx:1, qIdx:1, phase:'value-mismatch', result:false, desc:'p.val(2) != q.val(1) ❌ → VALUES DIFFER even though both nodes exist! Return false immediately.' },

          { pIdx:0, qIdx:0, phase:'done', result:false, desc:'🎉 Left subtree comparison returned false → short-circuit, skip checking the right side entirely. Trees are NOT the same. Return false.' },
        ],
      },
    ],
  },
  23: {
    tests: [
      {
        label: 'Example 1 — perfect square',
        caption: 'x=4 → 2',
        x: 4,
        expected: '2',
        steps: [
          { low:1, high:4, mid:null, sq:null, ans:0, phase:'init', desc:'x=4 (not 0 or 1). Search range: low=1, high=4, ans=0.' },

          { low:1, high:4, mid:2, sq:4, ans:0, phase:'compute', desc:'mid = (1+4)/2 = 2. mid*mid = 2×2 = 4.' },
          { low:1, high:4, mid:2, sq:4, ans:2, phase:'exact', desc:'mid*mid(4) == x(4) ✅ EXACT MATCH! Return 2 immediately — no need to keep searching.' },
        ],
      },
      {
        label: 'Example 2 — not a perfect square',
        caption: 'x=8 → 2',
        x: 8,
        expected: '2',
        steps: [
          { low:1, high:8, mid:null, sq:null, ans:0, phase:'init', desc:'x=8 (not 0 or 1). Search range: low=1, high=8, ans=0.' },

          { low:1, high:8, mid:4, sq:16, ans:0, phase:'compute', desc:'mid = (1+8)/2 = 4. mid*mid = 4×4 = 16.' },
          { low:1, high:8, mid:4, sq:16, ans:0, phase:'too-big', desc:'mid*mid(16) > x(8) ❌ Too big! Search LEFT. high = mid-1 = 3.' },
          { low:1, high:3, mid:null, sq:null, ans:0, phase:'narrow', desc:'low=1, high=3.' },

          { low:1, high:3, mid:2, sq:4, ans:0, phase:'compute', desc:'mid = (1+3)/2 = 2. mid*mid = 2×2 = 4.' },
          { low:1, high:3, mid:2, sq:4, ans:2, phase:'save-right', desc:'mid*mid(4) < x(8) ✅ mid=2 is a valid candidate! Save ans=2. Search RIGHT for something bigger. low = mid+1 = 3.' },
          { low:3, high:3, mid:null, sq:null, ans:2, phase:'narrow', desc:'low=3, high=3.' },

          { low:3, high:3, mid:3, sq:9, ans:2, phase:'compute', desc:'mid = (3+3)/2 = 3. mid*mid = 3×3 = 9.' },
          { low:3, high:3, mid:3, sq:9, ans:2, phase:'too-big', desc:'mid*mid(9) > x(8) ❌ Too big! Search LEFT. high = mid-1 = 2.' },
          { low:3, high:2, mid:null, sq:null, ans:2, phase:'narrow', desc:'low=3, high=2. low > high → loop ends.' },

          { low:3, high:2, mid:null, sq:null, ans:2, phase:'done', desc:'🎉 Loop ended. Return the saved ans = 2. (√8 ≈ 2.828, floored to 2.)' },
        ],
      },
      {
        label: 'Example 3 — edge cases 0 and 1',
        caption: 'x=0 → 0',
        x: 0,
        expected: '0',
        steps: [
          { low:null, high:null, mid:null, sq:null, ans:0, phase:'shortcut', desc:'x=0 → special case triggers immediately. Return 0 — no binary search needed.' },
        ],
      },
      {
        label: 'Example 4 — larger non-perfect square',
        caption: 'x=17 → 4',
        x: 17,
        expected: '4',
        steps: [
          { low:1, high:17, mid:null, sq:null, ans:0, phase:'init', desc:'x=17. Search range: low=1, high=17, ans=0.' },

          { low:1, high:17, mid:9, sq:81, ans:0, phase:'compute', desc:'mid = (1+17)/2 = 9. mid*mid = 9×9 = 81.' },
          { low:1, high:17, mid:9, sq:81, ans:0, phase:'too-big', desc:'mid*mid(81) > x(17) ❌ Too big! Search LEFT. high = mid-1 = 8.' },
          { low:1, high:8, mid:null, sq:null, ans:0, phase:'narrow', desc:'low=1, high=8.' },

          { low:1, high:8, mid:4, sq:16, ans:0, phase:'compute', desc:'mid = (1+8)/2 = 4. mid*mid = 4×4 = 16.' },
          { low:1, high:8, mid:4, sq:16, ans:4, phase:'save-right', desc:'mid*mid(16) < x(17) ✅ mid=4 is valid! Save ans=4. Search RIGHT. low = mid+1 = 5.' },
          { low:5, high:8, mid:null, sq:null, ans:4, phase:'narrow', desc:'low=5, high=8.' },

          { low:5, high:8, mid:6, sq:36, ans:4, phase:'compute', desc:'mid = (5+8)/2 = 6. mid*mid = 6×6 = 36.' },
          { low:5, high:8, mid:6, sq:36, ans:4, phase:'too-big', desc:'mid*mid(36) > x(17) ❌ Too big! Search LEFT. high = mid-1 = 5.' },
          { low:5, high:5, mid:null, sq:null, ans:4, phase:'narrow', desc:'low=5, high=5.' },

          { low:5, high:5, mid:5, sq:25, ans:4, phase:'compute', desc:'mid = (5+5)/2 = 5. mid*mid = 5×5 = 25.' },
          { low:5, high:5, mid:5, sq:25, ans:4, phase:'too-big', desc:'mid*mid(25) > x(17) ❌ Too big! Search LEFT. high = mid-1 = 4.' },
          { low:5, high:4, mid:null, sq:null, ans:4, phase:'narrow', desc:'low=5, high=4. low > high → loop ends.' },

          { low:5, high:4, mid:null, sq:null, ans:4, phase:'done', desc:'🎉 Loop ended. Return the saved ans = 4. (√17 ≈ 4.123, floored to 4.)' },
        ],
      },
    ],
  },
  24: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[-10,-3,0,5,9] → balanced BST rooted at 0',
        arr: [-10, -3, 0, 5, 9],
        treeNodes: [
          { idx: 0, val: 0,   x: 2, y: 0, left: 1,    right: 3    },
          { idx: 1, val: -10, x: 0, y: 1, left: null, right: 2    },
          { idx: 2, val: -3,  x: 1, y: 2, left: null, right: null },
          { idx: 3, val: 5,   x: 3, y: 1, left: null, right: 4    },
          { idx: 4, val: 9,   x: 4, y: 2, left: null, right: null },
        ],
        expected: '[0,-3,9,-10,null,5]',
        steps: [
          { lo:0, hi:4, mid:2, activeIdx:null, status:{}, callStack:['(0,4)'], phase:'call', desc:'build(0,4): mid = (0+4)/2 = 2 → nums[2] = 0. This becomes the root.' },
          { lo:0, hi:4, mid:2, activeIdx:0, status:{0:'created'}, callStack:['(0,4)'], phase:'create', desc:'✅ Root node created: value 0.' },

          { lo:0, hi:1, mid:0, activeIdx:null, status:{0:'created'}, callStack:['(0,4)','(0,1)'], phase:'call', desc:'Recurse LEFT of root: build(0,1). mid = (0+1)/2 = 0 → nums[0] = -10.' },
          { lo:0, hi:1, mid:0, activeIdx:1, status:{0:'created',1:'created'}, callStack:['(0,4)','(0,1)'], phase:'create', desc:'✅ Node created: value -10, attached as root\'s LEFT child.' },

          { lo:0, hi:-1, mid:null, activeIdx:null, status:{0:'created',1:'created'}, callStack:['(0,4)','(0,1)','(0,-1)'], phase:'call', desc:'Recurse LEFT of -10: build(0,-1). lo(0) > hi(-1) → base case!' },
          { lo:0, hi:-1, mid:null, activeIdx:null, status:{0:'created',1:'created'}, callStack:['(0,4)','(0,1)'], phase:'base-null', desc:'-10\'s left child is null — no elements remain in that range.' },

          { lo:1, hi:1, mid:1, activeIdx:null, status:{0:'created',1:'created'}, callStack:['(0,4)','(0,1)','(1,1)'], phase:'call', desc:'Recurse RIGHT of -10: build(1,1). mid = (1+1)/2 = 1 → nums[1] = -3.' },
          { lo:1, hi:1, mid:1, activeIdx:2, status:{0:'created',1:'created',2:'created'}, callStack:['(0,4)','(0,1)','(1,1)'], phase:'create', desc:'✅ Node created: value -3, attached as -10\'s RIGHT child.' },

          { lo:1, hi:0, mid:null, activeIdx:null, status:{0:'created',1:'created',2:'created'}, callStack:['(0,4)','(0,1)','(1,1)'], phase:'base-null', desc:'-3\'s left (build(1,0)) and right (build(2,1)) are both empty ranges → both children null.' },

          { lo:0, hi:1, mid:0, activeIdx:null, status:{0:'created',1:'created',2:'created'}, callStack:['(0,4)'], phase:'return', desc:'✅ Left subtree of root complete: -10 (right child -3). Pop back up to the root call.' },

          { lo:3, hi:4, mid:3, activeIdx:null, status:{0:'created',1:'created',2:'created'}, callStack:['(0,4)','(3,4)'], phase:'call', desc:'Recurse RIGHT of root: build(3,4). mid = (3+4)/2 = 3 → nums[3] = 5.' },
          { lo:3, hi:4, mid:3, activeIdx:3, status:{0:'created',1:'created',2:'created',3:'created'}, callStack:['(0,4)','(3,4)'], phase:'create', desc:'✅ Node created: value 5, attached as root\'s RIGHT child.' },

          { lo:3, hi:2, mid:null, activeIdx:null, status:{0:'created',1:'created',2:'created',3:'created'}, callStack:['(0,4)','(3,4)'], phase:'base-null', desc:'5\'s left child (build(3,2)) is null — empty range.' },

          { lo:4, hi:4, mid:4, activeIdx:null, status:{0:'created',1:'created',2:'created',3:'created'}, callStack:['(0,4)','(3,4)','(4,4)'], phase:'call', desc:'Recurse RIGHT of 5: build(4,4). mid = (4+4)/2 = 4 → nums[4] = 9.' },
          { lo:4, hi:4, mid:4, activeIdx:4, status:{0:'created',1:'created',2:'created',3:'created',4:'created'}, callStack:['(0,4)','(3,4)','(4,4)'], phase:'create', desc:'✅ Node created: value 9, attached as 5\'s RIGHT child.' },

          { lo:4, hi:3, mid:null, activeIdx:null, status:{0:'created',1:'created',2:'created',3:'created',4:'created'}, callStack:['(0,4)','(3,4)','(4,4)'], phase:'base-null', desc:'9 has no children — both subranges are empty.' },

          { lo:3, hi:4, mid:3, activeIdx:null, status:{0:'created',1:'created',2:'created',3:'created',4:'created'}, callStack:['(0,4)'], phase:'return', desc:'✅ Right subtree of root complete: 5 (right child 9). Pop back up to the root call.' },

          { lo:null, hi:null, mid:null, activeIdx:null, status:{0:'created',1:'created',2:'created',3:'created',4:'created'}, callStack:[], phase:'done', desc:'🎉 Tree fully built! Height-balanced: root 0 → left (-10→-3), right (5→9). Every split was as even as possible.' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'nums=[1,3] → [1,null,3]',
        arr: [1, 3],
        treeNodes: [
          { idx: 0, val: 1, x: 0, y: 0, left: null, right: 1 },
          { idx: 1, val: 3, x: 1, y: 1, left: null, right: null },
        ],
        expected: '[1,null,3]',
        steps: [
          { lo:0, hi:1, mid:0, activeIdx:null, status:{}, callStack:['(0,1)'], phase:'call', desc:'build(0,1): mid = (0+1)/2 = 0 → nums[0] = 1. This becomes the root.' },
          { lo:0, hi:1, mid:0, activeIdx:0, status:{0:'created'}, callStack:['(0,1)'], phase:'create', desc:'✅ Root node created: value 1.' },

          { lo:0, hi:-1, mid:null, activeIdx:null, status:{0:'created'}, callStack:['(0,1)','(0,-1)'], phase:'call', desc:'Recurse LEFT of root: build(0,-1). lo(0) > hi(-1) → base case!' },
          { lo:0, hi:-1, mid:null, activeIdx:null, status:{0:'created'}, callStack:['(0,1)'], phase:'base-null', desc:'Root\'s left child is null — with only 2 elements, the left-biased mid puts nothing to the left.' },

          { lo:1, hi:1, mid:1, activeIdx:null, status:{0:'created'}, callStack:['(0,1)','(1,1)'], phase:'call', desc:'Recurse RIGHT of root: build(1,1). mid = (1+1)/2 = 1 → nums[1] = 3.' },
          { lo:1, hi:1, mid:1, activeIdx:1, status:{0:'created',1:'created'}, callStack:['(0,1)','(1,1)'], phase:'create', desc:'✅ Node created: value 3, attached as root\'s RIGHT child.' },

          { lo:1, hi:0, mid:null, activeIdx:null, status:{0:'created',1:'created'}, callStack:['(0,1)','(1,1)'], phase:'base-null', desc:'3 has no children — both subranges are empty.' },

          { lo:null, hi:null, mid:null, activeIdx:null, status:{0:'created',1:'created'}, callStack:[], phase:'done', desc:'🎉 Tree complete: [1, null, 3] — a valid height-balanced BST.' },
        ],
      },
      {
        label: 'Example 3 — single element',
        caption: 'nums=[5] → [5]',
        arr: [5],
        treeNodes: [
          { idx: 0, val: 5, x: 0, y: 0, left: null, right: null },
        ],
        expected: '[5]',
        steps: [
          { lo:0, hi:0, mid:0, activeIdx:null, status:{}, callStack:['(0,0)'], phase:'call', desc:'build(0,0): mid = (0+0)/2 = 0 → nums[0] = 5. This becomes the root.' },
          { lo:0, hi:0, mid:0, activeIdx:0, status:{0:'created'}, callStack:['(0,0)'], phase:'create', desc:'✅ Root node created: value 5.' },
          { lo:0, hi:-1, mid:null, activeIdx:null, status:{0:'created'}, callStack:['(0,0)'], phase:'base-null', desc:'Both left (build(0,-1)) and right (build(1,0)) are empty ranges — a single node has no children.' },
          { lo:null, hi:null, mid:null, activeIdx:null, status:{0:'created'}, callStack:[], phase:'done', desc:'🎉 Tree complete: just [5], trivially balanced.' },
        ],
      },
    ],
  },
  25: {
    tests: [
      {
        label: 'Example 1 — shuffle, reset, shuffle',
        caption: 'nums=[1,2,3] → shuffle → reset → shuffle',
        original: [1, 2, 3],
        expected: 'Any permutation each time (shown: [3,1,2], then [1,2,3], then [2,3,1])',
        steps: [
          { op:'init', arr:[1,2,3], original:[1,2,3], i:null, j:null, phase:'construct', desc:'Solution([1,2,3]) called. Save original=[1,2,3] and working arr=[1,2,3].' },

          { op:'shuffle', arr:[1,2,3], original:[1,2,3], i:2, j:null, phase:'pick-j', desc:'shuffle() call #1. i=2 (last index). Pick a random j in [0,2] — say j=0.' },
          { op:'shuffle', arr:[3,2,1], original:[1,2,3], i:2, j:0, phase:'swap', desc:'Swap arr[2]↔arr[0]: [1,2,3] → [3,2,1].' },

          { op:'shuffle', arr:[3,2,1], original:[1,2,3], i:1, j:null, phase:'pick-j', desc:'i=1. Pick a random j in [0,1] — say j=1 (same index — a valid, if visually uneventful, outcome).' },
          { op:'shuffle', arr:[3,2,1], original:[1,2,3], i:1, j:1, phase:'swap', desc:'Swap arr[1]↔arr[1]: no visible change. Array stays [3,2,1].' },

          { op:'shuffle', arr:[3,2,1], original:[1,2,3], i:null, j:null, phase:'loop-end', desc:'i reached 0 — loop stops (index 0 is only ever touched as a possible j, never as i).' },
          { op:'shuffle', arr:[3,1,2], original:[1,2,3], i:null, j:null, phase:'result', desc:'✅ shuffle() returns [3,1,2] for THIS run. Every one of the 3! = 6 permutations of [1,2,3] is equally likely on any given call — a different call could just as easily return [2,3,1] or [1,2,3] itself.' },

          { op:'reset', arr:[1,2,3], original:[1,2,3], i:null, j:null, phase:'reset', desc:'reset() called. arr is restored from the saved original copy: [1,2,3].' },

          { op:'shuffle', arr:[1,2,3], original:[1,2,3], i:2, j:null, phase:'pick-j', desc:'shuffle() call #2 — a FRESH random sequence, independent of call #1. i=2. Pick random j in [0,2] — say j=1.' },
          { op:'shuffle', arr:[1,3,2], original:[1,2,3], i:2, j:1, phase:'swap', desc:'Swap arr[2]↔arr[1]: [1,2,3] → [1,3,2].' },

          { op:'shuffle', arr:[1,3,2], original:[1,2,3], i:1, j:null, phase:'pick-j', desc:'i=1. Pick random j in [0,1] — say j=0.' },
          { op:'shuffle', arr:[3,1,2], original:[1,2,3], i:1, j:0, phase:'swap', desc:'Swap arr[1]↔arr[0]: [1,3,2] → [3,1,2].' },

          { op:'shuffle', arr:[3,1,2], original:[1,2,3], i:null, j:null, phase:'loop-end', desc:'i reached 0 — loop stops.' },
          { op:'shuffle', arr:[3,1,2], original:[1,2,3], i:null, j:null, phase:'result', desc:'✅ This run\'s shuffle() returns [3,1,2] — coincidentally the same as call #1 here, but that\'s just one possible outcome. reset() always guarantees a clean slate before the next shuffle.' },
        ],
      },
      {
        label: 'Example 2 — reset restores exactly',
        caption: 'nums=[4,-1,7] → shuffle → reset → reset',
        original: [4, -1, 7],
        expected: 'reset() always returns [4,-1,7] regardless of prior shuffles',
        steps: [
          { op:'init', arr:[4,-1,7], original:[4,-1,7], i:null, j:null, phase:'construct', desc:'Solution([4,-1,7]) called. original=[4,-1,7], arr=[4,-1,7].' },

          { op:'shuffle', arr:[4,-1,7], original:[4,-1,7], i:2, j:null, phase:'pick-j', desc:'shuffle(): i=2. Random j in [0,2] — say j=2 (self-swap).' },
          { op:'shuffle', arr:[4,-1,7], original:[4,-1,7], i:2, j:2, phase:'swap', desc:'Swap arr[2]↔arr[2]: no change.' },
          { op:'shuffle', arr:[4,-1,7], original:[4,-1,7], i:1, j:null, phase:'pick-j', desc:'i=1. Random j in [0,1] — say j=0.' },
          { op:'shuffle', arr:[-1,4,7], original:[4,-1,7], i:1, j:0, phase:'swap', desc:'Swap arr[1]↔arr[0]: [4,-1,7] → [-1,4,7].' },
          { op:'shuffle', arr:[-1,4,7], original:[4,-1,7], i:null, j:null, phase:'result', desc:'✅ shuffle() returns [-1,4,7] — the working array is now scrambled, but original is untouched.' },

          { op:'reset', arr:[4,-1,7], original:[4,-1,7], i:null, j:null, phase:'reset', desc:'reset() called. arr restored to original: [4,-1,7], regardless of how scrambled it was.' },
          { op:'reset', arr:[4,-1,7], original:[4,-1,7], i:null, j:null, phase:'reset', desc:'reset() called again immediately — still [4,-1,7], since original never changes.' },
        ],
      },
    ],
  },
  26: {
    tests: [
      {
        label: 'Example 1 — exact problem sequence',
        caption: 'nums=[1,2,3]: next, peek, next, next, hasNext',
        arr: [1, 2, 3],
        ops: ['next', 'peek', 'next', 'next', 'hasNext'],
        expected: '[1, 2, 2, 3, false]',
        steps: [
          { op:'init', realPtr:0, cached:null, hasCached:false, result:null, phase:'construct', desc:'PeekingIterator([1,2,3]) created. Real iterator pointer starts at index 0. Cache is empty.' },

          { op:'next', realPtr:0, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #1: next(). Check cache — hasCached is false.' },
          { op:'next', realPtr:1, cached:null, hasCached:false, result:1, phase:'delegate', desc:'Nothing cached → delegate straight to the real iterator\'s next(). Pulls value 1, pointer advances to index 1. Return 1.' },

          { op:'peek', realPtr:1, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #2: peek(). Check cache — hasCached is false.' },
          { op:'peek', realPtr:2, cached:2, hasCached:true, result:null, phase:'pull-cache', desc:'Nothing cached → pull ONE value from the real iterator: value 2, pointer advances to index 2. Store cachedValue=2, hasCached=true.' },
          { op:'peek', realPtr:2, cached:2, hasCached:true, result:2, phase:'return-cache', desc:'Return the cached value: 2. The real iterator already moved past it, but conceptually "the next element" is still 2 from the caller\'s view.' },

          { op:'next', realPtr:2, cached:2, hasCached:true, result:null, phase:'check-cache', desc:'Call #3: next(). Check cache — hasCached is TRUE (from the peek).' },
          { op:'next', realPtr:2, cached:null, hasCached:false, result:2, phase:'consume-cache', desc:'Return the cached value 2 and clear hasCached. Real iterator pointer is NOT touched — it\'s already sitting at index 2 from the earlier peek pull.' },

          { op:'next', realPtr:2, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #4: next(). Check cache — hasCached is false again.' },
          { op:'next', realPtr:3, cached:null, hasCached:false, result:3, phase:'delegate', desc:'Nothing cached → delegate to real iterator\'s next(). Pulls value 3, pointer advances to index 3 (past the end). Return 3.' },

          { op:'hasNext', realPtr:3, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #5: hasNext(). Check: hasCached is false...' },
          { op:'hasNext', realPtr:3, cached:null, hasCached:false, result:false, phase:'check-real', desc:'...AND the real iterator has no more elements (pointer=3, array length=3). Return false.' },

          { op:'done', realPtr:3, cached:null, hasCached:false, result:null, phase:'done', desc:'🎉 Full sequence complete. Outputs: [null, 1, 2, 2, 3, false] — matching the expected result exactly.' },
        ],
      },
      {
        label: 'Example 2 — peek called multiple times in a row',
        caption: 'nums=[5,8], peek, peek, next, hasNext',
        arr: [5, 8],
        ops: ['peek', 'peek', 'next', 'hasNext'],
        expected: '[5, 5, 5, true]',
        steps: [
          { op:'init', realPtr:0, cached:null, hasCached:false, result:null, phase:'construct', desc:'PeekingIterator([5,8]) created. realPtr=0, cache empty.' },

          { op:'peek', realPtr:0, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #1: peek(). hasCached is false.' },
          { op:'peek', realPtr:1, cached:5, hasCached:true, result:null, phase:'pull-cache', desc:'Pull from real iterator: value 5, pointer → index 1. Cache it.' },
          { op:'peek', realPtr:1, cached:5, hasCached:true, result:5, phase:'return-cache', desc:'Return cached value: 5.' },

          { op:'peek', realPtr:1, cached:5, hasCached:true, result:null, phase:'check-cache', desc:'Call #2: peek() AGAIN. hasCached is TRUE this time.' },
          { op:'peek', realPtr:1, cached:5, hasCached:true, result:5, phase:'return-cache', desc:'Since already cached, do NOT pull from real iterator again — just return the same cached value: 5. This is the key guard that prevents double-consuming.' },

          { op:'next', realPtr:1, cached:5, hasCached:true, result:null, phase:'check-cache', desc:'Call #3: next(). hasCached is true.' },
          { op:'next', realPtr:1, cached:null, hasCached:false, result:5, phase:'consume-cache', desc:'Return cached value 5, clear hasCached. Real pointer stays at index 1 (already advanced during the first peek).' },

          { op:'hasNext', realPtr:1, cached:null, hasCached:false, result:null, phase:'check-cache', desc:'Call #4: hasNext(). hasCached is false...' },
          { op:'hasNext', realPtr:1, cached:null, hasCached:false, result:true, phase:'check-real', desc:'...but the real iterator still has index 1 (value 8) remaining. Return true.' },

          { op:'done', realPtr:1, cached:null, hasCached:false, result:null, phase:'done', desc:'🎉 Complete. Outputs: [5, 5, 5, true] — two peeks in a row correctly returned the same value without skipping ahead.' },
        ],
      },
    ],
  },
  28: {
    tests: [
      {
        label: 'Example 1',
        caption: 'nums=[10,2] → "210"',
        arr: ['10', '2'],
        expected: '"210"',
        steps: [
          { phase:'convert', strs:['10','2'], compareA:null, compareB:null, sorted:null, desc:'Convert nums to strings: ["10", "2"].' },

          { phase:'compare', strs:['10','2'], compareA:'10', compareB:'2', concatAB:'102', concatBA:'210', winner:'B', desc:'Compare "10" vs "2": is "10"+"2"="102" > "2"+"10"="210"? ❌ No, 210 > 102 → "2" should come FIRST.' },

          { phase:'sorted', strs:['2','10'], compareA:null, compareB:null, sorted:['2','10'], desc:'✅ After sorting with this comparator: ["2", "10"].' },

          { phase:'check-zero', strs:['2','10'], compareA:null, compareB:null, sorted:['2','10'], desc:'Is the first element "0"? No, it\'s "2" — proceed normally.' },

          { phase:'join', strs:['2','10'], compareA:null, compareB:null, sorted:['2','10'], result:'210', desc:'🎉 Join: "2" + "10" = "210". This is the largest number formable from [10, 2].' },
        ],
      },
      {
        label: 'Example 2',
        caption: 'nums=[3,30,34,5,9] → "9534330"',
        arr: ['3', '30', '34', '5', '9'],
        expected: '"9534330"',
        steps: [
          { phase:'convert', strs:['3','30','34','5','9'], compareA:null, compareB:null, sorted:null, desc:'Convert nums to strings: ["3","30","34","5","9"].' },

          { phase:'compare', strs:['3','30','34','5','9'], compareA:'3', compareB:'30', concatAB:'330', concatBA:'303', winner:'A', desc:'Compare "3" vs "30": "3"+"30"="330" > "30"+"3"="303"? ✅ Yes → "3" should come BEFORE "30".' },

          { phase:'compare', strs:['3','30','34','5','9'], compareA:'34', compareB:'3', concatAB:'343', concatBA:'334', winner:'A', desc:'Compare "34" vs "3": "34"+"3"="343" > "3"+"34"="334"? ✅ Yes → "34" should come BEFORE "3".' },

          { phase:'compare', strs:['3','30','34','5','9'], compareA:'9', compareB:'5', concatAB:'95', concatBA:'59', winner:'A', desc:'Compare "9" vs "5": "9"+"5"="95" > "5"+"9"="59"? ✅ Yes → "9" should come BEFORE "5".' },

          { phase:'compare', strs:['3','30','34','5','9'], compareA:'5', compareB:'34', concatAB:'534', concatBA:'345', winner:'A', desc:'Compare "5" vs "34": "5"+"34"="534" > "34"+"5"="345"? ✅ Yes → "5" should come BEFORE "34".' },

          { phase:'sorted', strs:['9','5','34','3','30'], compareA:null, compareB:null, sorted:['9','5','34','3','30'], desc:'✅ Full sort complete (comparing all pairs): ["9","5","34","3","30"] — this is the winning order.' },

          { phase:'check-zero', strs:['9','5','34','3','30'], compareA:null, compareB:null, sorted:['9','5','34','3','30'], desc:'Is the first element "0"? No, it\'s "9" — proceed normally.' },

          { phase:'join', strs:['9','5','34','3','30'], compareA:null, compareB:null, sorted:['9','5','34','3','30'], result:'9534330', desc:'🎉 Join: "9"+"5"+"34"+"3"+"30" = "9534330". Notice "34" beats "3" for that slot, but "3" beats "30" — concatenation order isn\'t simply numeric or alphabetic!' },
        ],
      },
      {
        label: 'Example 3 — all zeros',
        caption: 'nums=[0,0] → "0"',
        arr: ['0', '0'],
        expected: '"0"',
        steps: [
          { phase:'convert', strs:['0','0'], compareA:null, compareB:null, sorted:null, desc:'Convert nums to strings: ["0", "0"].' },

          { phase:'compare', strs:['0','0'], compareA:'0', compareB:'0', concatAB:'00', concatBA:'00', winner:'tie', desc:'Compare "0" vs "0": "0"+"0"="00" equals "0"+"0"="00" → tie, order doesn\'t matter.' },

          { phase:'sorted', strs:['0','0'], compareA:null, compareB:null, sorted:['0','0'], desc:'Sorted (trivially): ["0", "0"].' },

          { phase:'check-zero', strs:['0','0'], compareA:null, compareB:null, sorted:['0','0'], desc:'Is the first element "0"? ✅ YES! This means EVERY number is 0 — joining normally would give "00", which is wrong.' },

          { phase:'zero-shortcut', strs:['0','0'], compareA:null, compareB:null, sorted:['0','0'], result:'0', desc:'🎉 Special case triggered: return "0" directly instead of "00".' },
        ],
      },
    ],
  },
  29: {
  tests: [
    {
      label: 'Example 1',
      caption: 'Multilevel: 1-2-3-4-5-6, child of 3: 7-8-9-10, child of 8: 11-12',
      nodes: [
        { id: 1,  val: 1,  x: 0, y: 0, next: 2,    child: null },
        { id: 2,  val: 2,  x: 1, y: 0, next: 3,    child: null },
        { id: 3,  val: 3,  x: 2, y: 0, next: 4,    child: 7 },
        { id: 4,  val: 4,  x: 3, y: 0, next: 5,    child: null },
        { id: 5,  val: 5,  x: 4, y: 0, next: 6,    child: null },
        { id: 6,  val: 6,  x: 5, y: 0, next: null, child: null },
        { id: 7,  val: 7,  x: 2, y: 1, next: 8,    child: null },
        { id: 8,  val: 8,  x: 3, y: 1, next: 9,    child: 11 },
        { id: 9,  val: 9,  x: 4, y: 1, next: 10,   child: null },
        { id: 10, val: 10, x: 5, y: 1, next: null, child: null },
        { id: 11, val: 11, x: 3, y: 2, next: 12,   child: null },
        { id: 12, val: 12, x: 4, y: 2, next: null, child: null },
      ],
      expected: '[1,2,3,7,8,11,12,9,10,4,5,6]',
      steps: [
        { callStack:[1], active:null, phase:'init', flat:[], links:[], desc:'flatten(1) called → solve(1). callStack=[solve(1)].' },

        { callStack:[1], active:1, phase:'visit-no-child', flat:[1], links:[], desc:'curr=1. No child → tail=1. Append to flattened order: [1].' },
        { callStack:[1], active:2, phase:'visit-no-child', flat:[1,2], links:[], desc:'curr=2. No child → tail=2. Flattened order: [1,2].' },

        { callStack:[1], active:3, phase:'visit-has-child', flat:[1,2,3], links:[], desc:'curr=3. Has child(7)! Save nextNode=4. Must recurse BEFORE linking.' },
        { callStack:[1,7], active:null, phase:'recurse-push', flat:[1,2,3], links:[], desc:'Push solve(7). callStack=[solve(1), solve(7)].' },

        { callStack:[1,7], active:7, phase:'visit-no-child', flat:[1,2,3,7], links:[], desc:'Inside solve(7): curr=7. No child → tail=7. Flattened order: [...,7].' },

        { callStack:[1,7], active:8, phase:'visit-has-child', flat:[1,2,3,7,8], links:[], desc:'curr=8. Has child(11)! Save nextNode=9. Must recurse BEFORE linking.' },
        { callStack:[1,7,11], active:null, phase:'recurse-push', flat:[1,2,3,7,8], links:[], desc:'Push solve(11). callStack=[solve(1), solve(7), solve(11)] — 3 levels deep!' },

        { callStack:[1,7,11], active:11, phase:'visit-no-child', flat:[1,2,3,7,8,11], links:[], desc:'Inside solve(11): curr=11. No child → tail=11.' },
        { callStack:[1,7,11], active:12, phase:'visit-no-child', flat:[1,2,3,7,8,11,12], links:[], desc:'curr=12. No child → tail=12. curr becomes null → solve(11) about to return.' },

        { callStack:[1,7], active:null, phase:'recurse-pop', flat:[1,2,3,7,8,11,12], links:[], desc:'solve(11) returns tail=12. Pop back to solve(7). childTail for node 8 = 12.' },

        { callStack:[1,7], active:8, phase:'link', flat:[1,2,3,7,8,11,12], links:[[8,11],[12,9]], desc:'Splice: 8->next=11, 11->prev=8, 8.child=null. nextNode(9) exists → 12->next=9, 9->prev=12. tail=12. curr moves to 9.' },

        { callStack:[1,7], active:9, phase:'visit-no-child', flat:[1,2,3,7,8,11,12,9], links:[[8,11],[12,9]], desc:'curr=9. No child → tail=9.' },
        { callStack:[1,7], active:10, phase:'visit-no-child', flat:[1,2,3,7,8,11,12,9,10], links:[[8,11],[12,9]], desc:'curr=10. No child → tail=10. curr becomes null → solve(7) about to return.' },

        { callStack:[1], active:null, phase:'recurse-pop', flat:[1,2,3,7,8,11,12,9,10], links:[[8,11],[12,9]], desc:'solve(7) returns tail=10. Pop back to solve(1). childTail for node 3 = 10.' },

        { callStack:[1], active:3, phase:'link', flat:[1,2,3,7,8,11,12,9,10], links:[[8,11],[12,9],[3,7],[10,4]], desc:'Splice: 3->next=7, 7->prev=3, 3.child=null. nextNode(4) exists → 10->next=4, 4->prev=10. tail=10. curr moves to 4.' },

        { callStack:[1], active:4, phase:'visit-no-child', flat:[1,2,3,7,8,11,12,9,10,4], links:[[8,11],[12,9],[3,7],[10,4]], desc:'curr=4. No child → tail=4.' },
        { callStack:[1], active:5, phase:'visit-no-child', flat:[1,2,3,7,8,11,12,9,10,4,5], links:[[8,11],[12,9],[3,7],[10,4]], desc:'curr=5. No child → tail=5.' },
        { callStack:[1], active:6, phase:'visit-no-child', flat:[1,2,3,7,8,11,12,9,10,4,5,6], links:[[8,11],[12,9],[3,7],[10,4]], desc:'curr=6. No child → tail=6. curr becomes null → solve(1) about to return.' },

        { callStack:[], active:null, phase:'done', flat:[1,2,3,7,8,11,12,9,10,4,5,6], links:[[8,11],[12,9],[3,7],[10,4]], desc:'🎉 solve(1) returns tail=6. flatten() returns head=1. Final flattened list: [1,2,3,7,8,11,12,9,10,4,5,6].' },
      ],
    },
    {
      label: 'Example 2',
      caption: '1-2, child of 1: single node 3',
      nodes: [
        { id: 1, val: 1, x: 0, y: 0, next: 2,    child: 3 },
        { id: 2, val: 2, x: 1, y: 0, next: null, child: null },
        { id: 3, val: 3, x: 0, y: 1, next: null, child: null },
      ],
      expected: '[1,3,2]',
      steps: [
        { callStack:[1], active:null, phase:'init', flat:[], links:[], desc:'flatten(1) called → solve(1). callStack=[solve(1)].' },

        { callStack:[1], active:1, phase:'visit-has-child', flat:[1], links:[], desc:'curr=1. Has child(3)! Save nextNode=2. Must recurse BEFORE linking.' },
        { callStack:[1,3], active:null, phase:'recurse-push', flat:[1], links:[], desc:'Push solve(3). callStack=[solve(1), solve(3)].' },

        { callStack:[1,3], active:3, phase:'visit-no-child', flat:[1,3], links:[], desc:'Inside solve(3): curr=3. No child → tail=3. curr becomes null → solve(3) about to return.' },

        { callStack:[1], active:null, phase:'recurse-pop', flat:[1,3], links:[], desc:'solve(3) returns tail=3. Pop back to solve(1). childTail for node 1 = 3.' },

        { callStack:[1], active:1, phase:'link', flat:[1,3], links:[[1,3],[3,2]], desc:'Splice: 1->next=3, 3->prev=1, 1.child=null. nextNode(2) exists → 3->next=2, 2->prev=3. tail=3. curr moves to 2.' },

        { callStack:[1], active:2, phase:'visit-no-child', flat:[1,3,2], links:[[1,3],[3,2]], desc:'curr=2. No child → tail=2. curr becomes null → solve(1) about to return.' },

        { callStack:[], active:null, phase:'done', flat:[1,3,2], links:[[1,3],[3,2]], desc:'🎉 solve(1) returns tail=2. Final flattened list: [1,3,2].' },
      ],
    },
    {
      label: 'Example 3 — empty list',
      caption: 'head = null',
      nodes: [],
      expected: '[]',
      steps: [
        { callStack:[], active:null, phase:'done', flat:[], links:[], desc:'head is null → flatten() returns null immediately. Nothing to do.' },
      ],
    },
  ],
},
30: {
  tests: [
    {
      label: 'Example 1',
      caption: 'nums=[2,0,2,1,1,0] → [0,0,1,1,2,2]',
      arr: [2, 0, 2, 1, 1, 0],
      expected: '[0,0,1,1,2,2]',
      steps: [
        { low:0, mid:0, high:5, arr:[2,0,2,1,1,0], action:null, phase:'init', desc:'Init: low=0, mid=0, high=5.' },

        { low:0, mid:0, high:5, arr:[2,0,2,1,1,0], action:'2', phase:'check', desc:'nums[mid=0]=2 → swap with high.' },
        { low:0, mid:0, high:4, arr:[0,0,2,1,1,2], action:null, phase:'swap-high', desc:'Swap nums[0]↔nums[5]: [2,0,2,1,1,0]→[0,0,2,1,1,2]. high-- → 4. mid stays at 0 (unexamined value now there).' },

        { low:0, mid:0, high:4, arr:[0,0,2,1,1,2], action:'0', phase:'check', desc:'nums[mid=0]=0 → swap with low.' },
        { low:1, mid:1, high:4, arr:[0,0,2,1,1,2], action:null, phase:'swap-low', desc:'Swap nums[0]↔nums[0]: no visible change (low==mid). low++→1, mid++→1.' },

        { low:1, mid:1, high:4, arr:[0,0,2,1,1,2], action:'0', phase:'check', desc:'nums[mid=1]=0 → swap with low.' },
        { low:2, mid:2, high:4, arr:[0,0,2,1,1,2], action:null, phase:'swap-low', desc:'Swap nums[1]↔nums[1]: no visible change. low++→2, mid++→2.' },

        { low:2, mid:2, high:4, arr:[0,0,2,1,1,2], action:'2', phase:'check', desc:'nums[mid=2]=2 → swap with high.' },
        { low:2, mid:2, high:3, arr:[0,0,1,1,2,2], action:null, phase:'swap-high', desc:'Swap nums[2]↔nums[4]: [0,0,2,1,1,2]→[0,0,1,1,2,2]. high--→3. mid stays at 2 (unexamined value now there).' },

        { low:2, mid:2, high:3, arr:[0,0,1,1,2,2], action:'1', phase:'check', desc:'nums[mid=2]=1 → already correct zone.' },
        { low:2, mid:3, high:3, arr:[0,0,1,1,2,2], action:null, phase:'advance-mid', desc:'Just advance mid++→3. No swap needed.' },

        { low:2, mid:3, high:3, arr:[0,0,1,1,2,2], action:'1', phase:'check', desc:'nums[mid=3]=1 → already correct zone.' },
        { low:2, mid:4, high:3, arr:[0,0,1,1,2,2], action:null, phase:'advance-mid', desc:'Advance mid++→4. Now mid(4) > high(3) → loop ends!' },

        { low:2, mid:4, high:3, arr:[0,0,1,1,2,2], action:null, phase:'done', desc:'🎉 mid > high → done! Final sorted array: [0,0,1,1,2,2].' },
      ],
    },
    {
      label: 'Example 2 — already sorted',
      caption: 'nums=[2,0,1] → [0,1,2]',
      arr: [2, 0, 1],
      expected: '[0,1,2]',
      steps: [
        { low:0, mid:0, high:2, arr:[2,0,1], action:null, phase:'init', desc:'Init: low=0, mid=0, high=2.' },

        { low:0, mid:0, high:2, arr:[2,0,1], action:'2', phase:'check', desc:'nums[mid=0]=2 → swap with high.' },
        { low:0, mid:0, high:1, arr:[1,0,2], action:null, phase:'swap-high', desc:'Swap nums[0]↔nums[2]: [2,0,1]→[1,0,2]. high--→1. mid stays at 0.' },

        { low:0, mid:0, high:1, arr:[1,0,2], action:'1', phase:'check', desc:'nums[mid=0]=1 → already correct zone.' },
        { low:0, mid:1, high:1, arr:[1,0,2], action:null, phase:'advance-mid', desc:'Advance mid++→1.' },

        { low:0, mid:1, high:1, arr:[1,0,2], action:'0', phase:'check', desc:'nums[mid=1]=0 → swap with low.' },
        { low:1, mid:2, high:1, arr:[0,1,2], action:null, phase:'swap-low', desc:'Swap nums[1]↔nums[0]: [1,0,2]→[0,1,2]. low++→1, mid++→2. Now mid(2) > high(1) → loop ends!' },

        { low:1, mid:2, high:1, arr:[0,1,2], action:null, phase:'done', desc:'🎉 mid > high → done! Final sorted array: [0,1,2].' },
      ],
    },
    {
      label: 'Example 3 — all same color',
      caption: 'nums=[1,1,1] → [1,1,1]',
      arr: [1, 1, 1],
      expected: '[1,1,1]',
      steps: [
        { low:0, mid:0, high:2, arr:[1,1,1], action:null, phase:'init', desc:'Init: low=0, mid=0, high=2.' },
        { low:0, mid:0, high:2, arr:[1,1,1], action:'1', phase:'check', desc:'nums[mid=0]=1 → already correct zone.' },
        { low:0, mid:1, high:2, arr:[1,1,1], action:null, phase:'advance-mid', desc:'Advance mid++→1.' },
        { low:0, mid:1, high:2, arr:[1,1,1], action:'1', phase:'check', desc:'nums[mid=1]=1 → already correct zone.' },
        { low:0, mid:2, high:2, arr:[1,1,1], action:null, phase:'advance-mid', desc:'Advance mid++→2.' },
        { low:0, mid:2, high:2, arr:[1,1,1], action:'1', phase:'check', desc:'nums[mid=2]=1 → already correct zone.' },
        { low:0, mid:3, high:2, arr:[1,1,1], action:null, phase:'advance-mid', desc:'Advance mid++→3. Now mid(3) > high(2) → loop ends!' },
        { low:0, mid:3, high:2, arr:[1,1,1], action:null, phase:'done', desc:'🎉 Done! Array was already uniform: [1,1,1].' },
      ],
    },
  ],
},
  };
