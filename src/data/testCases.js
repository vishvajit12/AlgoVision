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
};
