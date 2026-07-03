export const PROBLEMS = [
 {
  id: 1,             // ← existing id, do NOT change
  lc: 1,
  title: 'Two Sum',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Array', 'Hash Map'],
  animated: true,   // flip true once you confirm the new animation
  desc: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
  tc: 'O(n)',
  sc: 'O(n)',
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> seen;   // value -> index

        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];

            if (seen.count(complement)) {
                return {seen[complement], i};
            }

            seen[nums[i]] = i;
        }

        return {};
    }
};`,
  py: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}   # value -> index

        for i, num in enumerate(nums):
            complement = target - num

            if complement in seen:
                return [seen[complement], i]

            seen[num] = i

        return []`,
},
  {
    id:2, lc:704, title:'Binary Search', platform:'LeetCode', diff:'Easy',
    topics:['Binary Search','Array'], animated:true,
    desc: `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.

If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.`,
    tc:'O(log n)', sc:'O(1)',
    cpp:`class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if      (nums[mid] == target) return mid;
            else if (nums[mid] <  target) lo = mid + 1;
            else                          hi = mid - 1;
        }
        return -1;
    }
};`,
    py:`class Solution:
    def search(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if   nums[mid] == target: return mid
            elif nums[mid] <  target: lo = mid + 1
            else:                     hi = mid - 1
        return -1`,
  },
    {
  id: 3,            // ← existing id, do NOT change
  lc: 20,
  title: 'Valid Parentheses',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Stack', 'String'],
  animated: true,   // flip true once you confirm the new animation
  desc: 'Given a string s containing just the characters (){}[], determine if the input string is valid — every opening bracket must be closed by the same type, in the correct order.',
  tc: 'O(n)',
  sc: 'O(n)',
  cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;

        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') {
                st.push(c);
            } else {
                if (st.empty()) return false;

                char top = st.top();
                if ((c == ')' && top != '(') ||
                    (c == '}' && top != '{') ||
                    (c == ']' && top != '[')) {
                    return false;
                }
                st.pop();
            }
        }

        return st.empty();
    }
};`,
  py: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        pairs = {')': '(', '}': '{', ']': '['}

        for c in s:
            if c in '([{':
                stack.append(c)
            else:
                if not stack:
                    return False
                top = stack.pop()
                if pairs[c] != top:
                    return False

        return not stack`,
},
  { id:4,  lc: 3,
  title: 'Longest Substring Without Repeating Characters',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['String', 'Sliding Window'],
  animated: true,  // flip to true once you've confirmed the animation looks right
  desc: 'Given a string s, find the length of the longest substring without repeating characters.',
  tc: 'O(n)',
  sc: 'O(min(n, m))  // m = charset size',
  cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char,int> lastSeen;
        int left = 0, maxLen = 0;
        for (int right = 0; right < s.size(); right++) {
            char c = s[right];
            if (lastSeen.count(c) && lastSeen[c] >= left) {
                left = lastSeen[c] + 1;
            }
            lastSeen[c] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
  py: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            if c in last_seen and last_seen[c] >= left:
                left = last_seen[c] + 1
            last_seen[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len`, },
  {
  id: 5,        
  lc: 19,
  title: 'Remove Nth Node From End of List',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['Linked List', 'Two Pointers'],
  animated: true,
  desc: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
  tc: 'O(L)  // L = list length',
  sc: 'O(1)',
  cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {

    int length = 0;
    ListNode* temp = head;

    while(temp != nullptr) {
        length++;
        temp = temp->next;
    }

    int position = length - n + 1;

    if(position == 1) {
        ListNode* delNode = head;
        head = head->next;
        delete delNode;
        return head;
    }

    ListNode* prev = head;

    for(int i = 1; i < position - 1; i++) {
        prev = prev->next;
    }

    ListNode* delNode = prev->next;

    prev->next = delNode->next;

    delete delNode;

    return head;

    }
};`,
  py: `class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        length = 0
        temp = head
        while temp:
            length += 1
            temp = temp.next

        position = length - n + 1

        if position == 1:
            return head.next

        prev = head
        for _ in range(1, position - 1):
            prev = prev.next

        del_node = prev.next
        prev.next = del_node.next

        return head`,
},
  {
  id: 6,           // ← use your next unused id
  lc: 234,
  title: 'Palindrome Linked List',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Linked List', 'Stack', 'Two Pointers'],
  animated: true,
  desc: 'Given the head of a singly linked list, return true if it is a palindrome.',
  tc: 'O(n)',
  sc: 'O(n)  // stack holds all values',
  cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(nullptr) {}
 * };
 */
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        stack<int> st;
        ListNode* temp = head;

        while(temp != nullptr) {
            st.push(temp->val);
            temp = temp->next;
        }

        ListNode* curr = head;

        while(curr != nullptr) {
            if(curr->val != st.top()) return false;
            st.pop();
            curr = curr->next;
        }

        return true;
    }
};`,
  py: `class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        stack = []
        temp = head
        while temp:
            stack.append(temp.val)
            temp = temp.next

        curr = head
        while curr:
            if curr.val != stack.pop():
                return False
            curr = curr.next

        return True`,
},
 {

  id: 7,            // ← use your next unused id

  lc: 141,

  title: 'Linked List Cycle',

  platform: 'LeetCode',

  diff: 'Easy',

  topics: ['Linked List', 'Two Pointers'],

  animated: true,

  desc: 'Given head of a linked list, determine if the linked list has a cycle in it — i.e. some node can be reached again by continuously following next.',

  tc: 'O(n)',

  sc: 'O(1)',

  cpp: `/**

 * Definition for singly-linked list.

 * struct ListNode {

 *     int val;

 *     ListNode *next;

 *     ListNode(int x) : val(x), next(nullptr) {}

 * };

 */

class Solution {

public:

    bool hasCycle(ListNode *head) {

        ListNode* slow = head;

        ListNode* fast = head;

        while (fast != nullptr && fast->next != nullptr) {

            slow = slow->next;

            fast = fast->next->next;

            if (slow == fast) {

                return true;

            }

        }

        return false;

    }

};`,

  py: `class Solution:

    def hasCycle(self, head: Optional[ListNode]) -> bool:

        slow = head

        fast = head

        while fast and fast.next:

            slow = slow.next

            fast = fast.next.next

            if slow == fast:

                return True

        return False`,

},
  { id:8, 

  lc: 121,

  title: 'Best Time to Buy and Sell Stock',

  platform: 'LeetCode',

  diff: 'Easy',

  topics: ['Array', 'Greedy'],

  animated: true,

  desc: 'Given an array prices where prices[i] is the stock price on day i, find the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.',

  tc: 'O(n)',

  sc: 'O(1)',

  cpp: `class Solution {

public:

    int maxProfit(vector<int>& prices) {

    int max_profit = 0 ;

    int Best_buy= prices[0];

    for(int i = 1 ; i < prices.size() ;i++){

         if (prices[i]> Best_buy ){

         

         max_profit = max(max_profit , prices[i]-Best_buy);

         }

         Best_buy = min(Best_buy , prices[i]);

    }

         

    return max_profit ;

    }  

};`,

  py: `class Solution:

    def maxProfit(self, prices: List[int]) -> int:

        max_profit = 0

        best_buy = prices[0]

        for i in range(1, len(prices)):

            if prices[i] > best_buy:

                max_profit = max(max_profit, prices[i] - best_buy)

            best_buy = min(best_buy, prices[i])

        return max_profit`,

},
  { id:9,  lc: 217,          // LeetCode number (or cc/cf for other platforms)
  title: 'Contains Duplicate',
  platform: 'LeetCode',   // 'LeetCode' | 'CodeChef' | 'Codeforces'
  diff: 'Easy',           // 'Easy' | 'Medium' | 'Hard'
  topics: ['Array', 'Hash Map'],
  animated: true,         // ← set false until animation is done, then flip to true
  desc: 'Given an integer array, return true if any value appears at least twice.',
  tc: 'O(n)',
  sc: 'O(n)',
  cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
  py: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for n in nums:
            if n in seen:
                return True
            seen.add(n)
        return False`,
},
  {
  id: 10,             // ← use your next unused id
  lc: 88,
  title: 'Merge Sorted Array',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Array', 'Two Pointers', 'Sorting'],
  animated: true,
  desc: 'nums1 and nums2 are sorted arrays. nums1 has extra trailing space (length m+n) to hold nums2\'s elements. Merge nums2 into nums1 in-place so the result is one sorted array.',
  tc: 'O(m+n)',
  sc: 'O(1)',
  cpp: `class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1;        // last valid element in nums1
        int j = n - 1;        // last element in nums2
        int k = m + n - 1;    // last position in nums1 (empty slot)

        while (i >= 0 && j >= 0) {
            if (nums1[i] > nums2[j]) {
                nums1[k] = nums1[i];
                i--;
            } else {
                nums1[k] = nums2[j];
                j--;
            }
            k--;
        }

        // if any elements left in nums2, copy them
        while (j >= 0) {
            nums1[k] = nums2[j];
            j--;
            k--;
        }
    }
};`,
  py: `class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        i = m - 1        # last valid element in nums1
        j = n - 1        # last element in nums2
        k = m + n - 1     # last position in nums1 (empty slot)

        while i >= 0 and j >= 0:
            if nums1[i] > nums2[j]:
                nums1[k] = nums1[i]
                i -= 1
            else:
                nums1[k] = nums2[j]
                j -= 1
            k -= 1

        while j >= 0:
            nums1[k] = nums2[j]
            j -= 1
            k -= 1`,
},
  { id:11,         
   lc: 237,
  title: 'Delete Node in a Linked List',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['Linked List'],
  animated: true,
  desc: 'Write a function to delete a node in a singly-linked list. You are given access ONLY to that node, NOT to head. It is guaranteed the node to be deleted is not the tail.',
  tc: 'O(1)',
  sc: 'O(1)',
  cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    void deleteNode(ListNode* node) {

     node->val = node->next->val ;

     ListNode* temp = node->next ;

     node->next = node->next->next;

     delete temp;

    }
};`,
  py: `class Solution:
    def deleteNode(self, node):
        node.val = node.next.val
        temp = node.next
        node.next = node.next.next
        del temp`,
},
  { id:12 ,          // ← use your next unused id
    lc: 94,
  title: 'Binary Tree Inorder Traversal',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Tree', 'Stack', 'Binary Tree', 'Depth-First Search'],
  animated: true,
  desc: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values (left → root → right).',
  tc: 'O(n)',
  sc: 'O(n)  // stack + result array',
  cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode*> st;
        TreeNode* curr = root;

        while (curr != nullptr || !st.empty()) {
            // Go as far left as possible, pushing each node
            while (curr != nullptr) {
                st.push(curr);
                curr = curr->left;
            }

            // Backtrack: visit the node, then go right
            curr = st.top();
            st.pop();
            result.push_back(curr->val);

            curr = curr->right;
        }

        return result;
    }
};`,
  py: `class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        stack = []
        curr = root

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left

            curr = stack.pop()
            result.append(curr.val)

            curr = curr.right

        return result`,
},
  { id:13,           // ← use your next unused id
  cc: 'LUCKYSEVEN',
  title: 'Lucky Seven',
  platform: 'CodeChef',
  diff: 'Easy',
  topics: ['String', 'Implementation'],
  animated: true,
  desc: 'Chef considers the number 7 lucky. Given a string S of length 10, print the 7th character of the string (1-indexed) — which is index 6 in 0-indexed terms.',
  tc: 'O(1)',
  sc: 'O(1)',
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin >> s;

    cout << s[6] << endl;

    return 0;
}`,
  py: `s = input()
print(s[6])`,
},
  {
  id: 14,           // ← use your next unused id
  lc: 11,
  title: 'Container With Most Water',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['Array', 'Two Pointers', 'Greedy'],
  animated: true,
  desc: 'Given an array height where height[i] is the height of a vertical line at index i, find two lines that together with the x-axis form a container holding the most water. Return the max area.',
  tc: 'O(n)',
  sc: 'O(1)',
  cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
      int fst = 0;
      int sec = height.size()-1 ;
      int marea  = 0;

      while(sec > fst ){

     int area = min(height[fst],height[sec])*(sec- fst);
     marea = max(marea , area);
     if(height[sec]>height[fst]){
        fst = fst+1 ;
     }else{
        sec = sec -1 ;
     }

     }
     return marea;

    }
};`,
  py: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        fst = 0
        sec = len(height) - 1
        marea = 0

        while sec > fst:
            area = min(height[fst], height[sec]) * (sec - fst)
            marea = max(marea, area)

            if height[sec] > height[fst]:
                fst += 1
            else:
                sec -= 1

        return marea`,
},
 {
  id: 15,           // ← use your next unused id
  lc: 151,
  title: 'Reverse Words in a String',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['String', 'Two Pointers'],
  animated: true,
  desc: 'Given an input string s, reverse the order of the words. A word is a sequence of non-space characters, separated by at least one space. Return a string with words in reverse order, joined by a single space — no leading/trailing/extra spaces.',
  tc: 'O(n)',
  sc: 'O(n)',
  cpp: `class Solution {
public:
    string reverseWords(string s) {
        stringstream ss(s);
        vector<string> words;
        string word;

        // Extraction via >> automatically skips leading/multiple spaces
        while (ss >> word) {
            words.push_back(word);
        }

        reverse(words.begin(), words.end());

        string result;
        for (int i = 0; i < words.size(); i++) {
            result += words[i];
            if (i != words.size() - 1) result += " ";
        }

        return result;
    }
};`,
  py: `class Solution:
    def reverseWords(self, s: str) -> str:
        # split() with no args collapses multiple spaces and strips ends
        words = s.split()
        words.reverse()
        return " ".join(words)`,
},
{
  id: 16,           // ← use your next unused id
  lc: 1910,
  title: 'Remove All Occurrences of a Substring',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['String', 'Stack'],
  animated: true,
  desc: 'Given strings s and part, repeatedly remove the leftmost occurrence of part from s until it no longer occurs. Return s after all removals.',
  tc: 'O(n × k):k=part.length',
  sc: 'O(n)',
  cpp: `class Solution {
public:
    string removeOccurrences(string s, string part) {
        string st = "";  // using a string as our stack

        for (char c : s) {
            st.push_back(c);

            if (st.size() >= part.size() &&
                st.substr(st.size() - part.size()) == part) {
                st.erase(st.size() - part.size());
            }
        }

        return st;
    }
};`,
  py: `class Solution:
    def removeOccurrences(self, s: str, part: str) -> str:
        stack = []
        k = len(part)

        for c in s:
            stack.append(c)
            if len(stack) >= k and ''.join(stack[-k:]) == part:
                del stack[-k:]

        return ''.join(stack)`,
},{
  id: 17,           // ← use your next unused id
  lc: 144,
  title: 'Binary Tree Preorder Traversal',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Tree', 'Stack', 'Binary Tree'],
  animated: true,
  desc: 'Given the root of a binary tree, return the preorder traversal of its nodes\' values (root → left → right).',
  tc: 'O(n)',
  sc: 'O(n)',
  cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        if (!root) return result;

        stack<TreeNode*> st;
        st.push(root);

        while (!st.empty()) {
            TreeNode* node = st.top();
            st.pop();
            result.push_back(node->val);   // visit BEFORE children

            if (node->right) st.push(node->right);  // push right first
            if (node->left)  st.push(node->left);   // so left pops next
        }

        return result;
    }
};`,
  py: `class Solution:
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        if not root:
            return result

        stack = [root]

        while stack:
            node = stack.pop()
            result.append(node.val)   # visit BEFORE children

            if node.right:
                stack.append(node.right)   # push right first
            if node.left:
                stack.append(node.left)    # so left pops next

        return result`,
},
  { id:27, lc:48,  title:'Rotate Image',                                   platform:'LeetCode', diff:'Medium', topics:['Array'], animated:false, tc:'O(n²)',    sc:'O(1)', desc:'Rotate an N×N matrix 90 degrees clockwise in-place.' },
{
  id: 18,           // ← use your next unused id
  lc: 169,
  title: 'Majority Element',
  platform: 'LeetCode',
  diff: 'Easy',
  topics: ['Array', 'Hash Map', 'Sorting', 'Divide and Conquer'],
  animated: true,
  desc: 'Given an array nums of size n, return the majority element — the element that appears more than ⌊n/2⌋ times. The majority element is guaranteed to exist.',
  tc: 'O(n)',
  sc: 'O(1)',
  cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = 0;
        int count = 0;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if (num == candidate) {
                count++;
            } else {
                count--;
            }
        }
        return candidate;
    }
};`,
  py: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = 0
        count = 0

        for num in nums:
            if count == 0:
                candidate = num
            if num == candidate:
                count += 1
            else:
                count -= 1

        return candidate`,
},
 {
  id: 19,
  lc: 34,
  title: 'Find First and Last Position of Element in Sorted Array',
  platform: 'LeetCode',
  diff: 'Medium',
  topics: ['Array', 'Binary Search'],
  animated: true,
  desc: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. Return [-1,-1] if target is not found. Must run in O(log n) time.',
  tc: 'O(log n)',
  sc: 'O(1)',
  cpp: `class Solution {
public:
    int findFirst(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                high = mid - 1;   // move left
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }

    int findLast(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        int ans = -1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                ans = mid;
                low = mid + 1;   // move right
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }

    vector<int> searchRange(vector<int>& nums, int target) {
        int first = findFirst(nums, target);
        int last = findLast(nums, target);
        return {first, last};
    }
};`,
  py: `class Solution:
    def findFirst(self, nums, target):
        low, high = 0, len(nums) - 1
        ans = -1
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                ans = mid
                high = mid - 1   # move left
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return ans

    def findLast(self, nums, target):
        low, high = 0, len(nums) - 1
        ans = -1
        while low <= high:
            mid = low + (high - low) // 2
            if nums[mid] == target:
                ans = mid
                low = mid + 1   # move right
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return ans

    def searchRange(self, nums: List[int], target: int) -> List[int]:
        first = self.findFirst(nums, target)
        last = self.findLast(nums, target)
        return [first, last]`,
},
  { id:20, lc:56,  title:'Merge Intervals',                                platform:'LeetCode', diff:'Medium', topics:['Array','Greedy'], animated:false, tc:'O(n log n)', sc:'O(n)', desc:'Merge all overlapping intervals into one.' },
  // CodeChef
  { id:21, cc:'PRIMES',   title:'Prime Generator',       platform:'CodeChef', diff:'Easy',   topics:['Math'], animated:false, tc:'O(n log log n)', sc:'O(n)', desc:'Generate all prime numbers between M and N using Sieve of Eratosthenes.' },
  { id:22, cc:'FLOW007',  title:'Lucky Seven',           platform:'CodeChef', diff:'Easy',   topics:['Strings'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Check if a number contains digit 7 or is divisible by 7.' },
  { id:23, cc:'FCTRL',    title:'Factorial!',            platform:'CodeChef', diff:'Easy',   topics:['Math'], animated:false, tc:'O(n)', sc:'O(n)', desc:'Compute factorials of large numbers up to 100.' },
  // Codeforces
  { id:24, cf:'4A',   title:'Watermelon',             platform:'Codeforces', diff:'Easy',   topics:['Math'], animated:false, tc:'O(1)', sc:'O(1)', desc:'Divide a watermelon of weight W into two even non-zero parts.' },
  { id:25, cf:'1A',   title:'Theatre Square',         platform:'Codeforces', diff:'Easy',   topics:['Math'], animated:false, tc:'O(1)', sc:'O(1)', desc:'Find minimum flagstones to pave a rectangular theatre square.' },
  { id:26, cf:'266B', title:'Queue at the School',    platform:'Codeforces', diff:'Easy',   topics:['Strings','Simulation'], animated:false, tc:'O(n·t)', sc:'O(n)', desc:'Simulate a queue where boys and girls swap positions each second.' },
 // ── LeetCode ──────────────────────────────────────────────
  { id:28, lc:53,  title:'Maximum Subarray',                platform:'LeetCode', diff:'Medium', topics:['Array','Divide and Conquer','Dynamic Programming'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Find the contiguous subarray with the largest sum and return that sum.' },
  { id:29, lc:70,  title:'Climbing Stairs',                 platform:'LeetCode', diff:'Easy',   topics:['Math','Dynamic Programming','Memoization'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Count the distinct ways to climb n stairs taking 1 or 2 steps at a time.' },
  { id:30, lc:155, title:'Min Stack',                       platform:'LeetCode', diff:'Medium', topics:['Stack','Design'], animated:false, tc:'O(1) per op', sc:'O(n)', desc:'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.' },
  { id:31, lc:206, title:'Reverse Linked List',              platform:'LeetCode', diff:'Easy',   topics:['Linked List','Recursion'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Reverse a singly linked list and return the new head.' },
  { id:32, lc:226, title:'Invert Binary Tree',                platform:'LeetCode', diff:'Easy',   topics:['Tree','Binary Tree','Depth-First Search','Breadth-First Search'], animated:false, tc:'O(n)', sc:'O(n)', desc:'Given the root of a binary tree, invert the tree and return its root.' },
  { id:33, lc:733, title:'Flood Fill',                        platform:'LeetCode', diff:'Easy',   topics:['Array','Depth-First Search','Breadth-First Search','Matrix'], animated:false, tc:'O(n·m)', sc:'O(n·m)', desc:'Perform a flood fill on an image starting from a given pixel, replacing connected same-colored pixels with a new color.' },
  { id:34, lc:242, title:'Valid Anagram',                     platform:'LeetCode', diff:'Easy',   topics:['Hash Map','String','Sorting'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Given two strings s and t, determine if t is an anagram of s.' },
  { id:35, lc:125, title:'Valid Palindrome',                  platform:'LeetCode', diff:'Easy',   topics:['Two Pointers','String'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Given a string, determine if it is a palindrome after converting to lowercase and removing non-alphanumeric characters.' },
  { id:36, lc:283, title:'Move Zeroes',                       platform:'LeetCode', diff:'Easy',   topics:['Array','Two Pointers'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Move all zeroes in an array to the end while maintaining the relative order of the non-zero elements, in-place.' },
  { id:37, lc:448, title:'Find All Numbers Disappeared in an Array', platform:'LeetCode', diff:'Easy', topics:['Array','Hash Map'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Given an array of n integers where elements range from 1 to n, find all integers in that range that do not appear in the array.' },

  // ── CodeChef ──────────────────────────────────────────────
  { id:38, cc:'FLOW001',   title:'Add Two Numbers',      platform:'CodeChef', diff:'Easy', topics:['Math','Implementation'], animated:false, tc:'O(1)', sc:'O(1)', desc:'Read two integers and print their sum.' },
  { id:39, cc:'FLOW006',   title:'Enormous Input Test',  platform:'CodeChef', diff:'Easy', topics:['Implementation','Fast I/O'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Given a huge list of integers and a number k, count how many of them are divisible by k — tests fast input reading.' },
  { id:40, cc:'FLOW016',   title:'Xtreme Prime',          platform:'CodeChef', diff:'Easy', topics:['Math','Number Theory'], animated:false, tc:'O(√n)', sc:'O(1)', desc:'Given a number, determine whether it is prime.' },
  { id:41, cc:'FCTRL2',    title:'Small factorials',      platform:'CodeChef', diff:'Easy', topics:['Math','Big Integer'], animated:false, tc:'O(n²)', sc:'O(n)', desc:'Compute the factorial of a given number up to 100, requiring big-integer multiplication.' },
  { id:42, cc:'HS08TEST',  title:'CodeChef Beta Test',    platform:'CodeChef', diff:'Easy', topics:['Implementation'], animated:false, tc:'O(1)', sc:'O(1)', desc:'A simple test problem — read a number and print the greeting message the required number of times.' },
  // ── LeetCode ──────────────────────────────────────────────
  { id:43, lc:75,   title:'Sort Colors',                         platform:'LeetCode', diff:'Medium', topics:['Array','Two Pointers','Sorting'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Sort an array containing only 0s, 1s, and 2s in-place so equal elements are adjacent, without using a library sort.' },
  { id:44, lc:238,  title:'Product of Array Except Self',          platform:'LeetCode', diff:'Medium', topics:['Array','Prefix Sum'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Return an array where each element is the product of all other elements in the input array, without using division.' },
  { id:45, lc:56,   title:'Merge Intervals',                       platform:'LeetCode', diff:'Medium', topics:['Array','Sorting'], animated:false, tc:'O(n log n)', sc:'O(n)', desc:'Given an array of intervals, merge all overlapping intervals and return the resulting non-overlapping set.' },
  { id:46, lc:33,   title:'Search in Rotated Sorted Array',          platform:'LeetCode', diff:'Medium', topics:['Array','Binary Search'], animated:false, tc:'O(log n)', sc:'O(1)', desc:'Search for a target value in a rotated sorted array and return its index, or -1 if not found.' },
  { id:47, lc:15,   title:'3Sum',                                    platform:'LeetCode', diff:'Medium', topics:['Array','Two Pointers','Sorting'], animated:false, tc:'O(n²)', sc:'O(1)', desc:'Find all unique triplets in the array which give the sum of zero.' },
  { id:48, lc:198,  title:'House Robber',                            platform:'LeetCode', diff:'Medium', topics:['Array','Dynamic Programming'], animated:false, tc:'O(n)', sc:'O(1)', desc:'Given houses arranged in a line with money in each, find the maximum amount robbable without robbing two adjacent houses.' },
  { id:49, lc:207,  title:'Course Schedule',                         platform:'LeetCode', diff:'Medium', topics:['Graph','Topological Sort','Depth-First Search','Breadth-First Search'], animated:false, tc:'O(V+E)', sc:'O(V+E)', desc:'Given prerequisite pairs for courses, determine if it is possible to finish all courses (detect a cycle in the dependency graph).' },
  { id:50, lc:200,  title:'Number of Islands',                       platform:'LeetCode', diff:'Medium', topics:['Array','Depth-First Search','Breadth-First Search','Matrix'], animated:false, tc:'O(n·m)', sc:'O(n·m)', desc:'Given a 2D grid of \'1\'s (land) and \'0\'s (water), count the number of islands formed by connected land cells.' },
  { id:51, lc:236,  title:'Lowest Common Ancestor of a Binary Tree', platform:'LeetCode', diff:'Medium', topics:['Tree','Binary Tree','Depth-First Search'], animated:false, tc:'O(n)', sc:'O(n)', desc:'Given a binary tree, find the lowest common ancestor of two given nodes in the tree.' },
  { id:52, lc:5,    title:'Longest Palindromic Substring',            platform:'LeetCode', diff:'Medium', topics:['String','Dynamic Programming'], animated:false, tc:'O(n²)', sc:'O(1)', desc:'Given a string, return the longest substring that is a palindrome.' },
  { id:53, lc:322,  title:'Coin Change',                              platform:'LeetCode', diff:'Medium', topics:['Array','Dynamic Programming','Breadth-First Search'], animated:false, tc:'O(n·amount)', sc:'O(amount)', desc:'Given coin denominations and a target amount, find the fewest number of coins needed to make up that amount.' },
  { id:54, lc:46,   title:'Permutations',                              platform:'LeetCode', diff:'Medium', topics:['Array','Backtracking'], animated:false, tc:'O(n·n!)', sc:'O(n!)', desc:'Given an array of distinct integers, return all possible permutations.' },
  { id:55, lc:78,   title:'Subsets',                                   platform:'LeetCode', diff:'Medium', topics:['Array','Backtracking','Bit Manipulation'], animated:false, tc:'O(n·2ⁿ)', sc:'O(2ⁿ)', desc:'Given an array of unique integers, return all possible subsets (the power set).' },
  { id:56, lc:98,   title:'Validate Binary Search Tree',                 platform:'LeetCode', diff:'Medium', topics:['Tree','Binary Search Tree','Depth-First Search'], animated:false, tc:'O(n)', sc:'O(n)', desc:'Given the root of a binary tree, determine if it is a valid binary search tree.' },
];

export const getProblemNum = (p) => {
  if (p.platform === 'LeetCode')   return '#' + p.lc;
  if (p.platform === 'CodeChef')   return p.cc;
  if (p.platform === 'Codeforces') return p.cf;
  return '';
};

export const getProblemLink = (p) => {
  if (p.platform === 'LeetCode')   return `https://leetcode.com/problems/${p.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')}/`;
  if (p.platform === 'CodeChef')   return `https://www.codechef.com/problems/${p.cc}`;
  if (p.platform === 'Codeforces') return `https://codeforces.com/problemset/problem/${(p.cf||'').replace(/([0-9]+)([A-Z])/,'$1/$2')}`;
  return '#';
};
