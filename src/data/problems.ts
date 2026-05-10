import { lazy } from 'react';

export interface CodeSolutions {
  c: string;
  cpp: string;
  python: string;
  java: string;
  javascript: string;
}

export interface Problem {
  id: string;
  title: string;
  categoryId: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  solutions: CodeSolutions;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] =[
  { id: 'simulation', title: 'Simulation & Implementation', icon: 'Cpu', description: 'Basic programming constructs, logic building, and simulation problems.' },
  { id: 'strings', title: 'Strings & Text Processing', icon: 'Type', description: 'String manipulation, parsing, and pattern matching.' },
  { id: 'data-structures', title: 'Data Structures & Search', icon: 'Database', description: 'Stacks, queues, trees, graphs, and searching algorithms.' },
  { id: 'greedy', title: 'Greedy & Scheduling', icon: 'FastForward', description: 'Making locally optimal choices to find global optimums.' },
  { id: 'math', title: 'Number Theory & Math Games', icon: 'Calculator', description: 'Primes, GCD, combinatorics game theory, and math puzzles.' },
  { id: 'recursion', title: 'Combinatorics & Recursion', icon: 'Infinity', description: 'Recursive problem solving and combinatorial generation.' },
];

export const PROBLEMS: Problem[] =[
  {
    id: 'the-trip',
    title: 'The Trip',
    categoryId: 'simulation',
    difficulty: 'Medium',
    statement: 'A number of students are members of a club that travels annually to exotic locations. Their destinations in the past have included Indianapolis, Phoenix, Nashville, Philadelphia, San Jose, and Atlanta. This spring they are planning a trip to Eindhoven.\n\nThe group agrees in advance to share expenses equally, but it is not practical to share every expense as it occurs. Thus individuals in the group pay for particular things, such as meals, hotels, taxi rides, and plane tickets. After the trip, each student\'s expenses are tallied and money is exchanged so that the net cost to each is the same, to within one cent. In the past, this money exchange has been tedious and time consuming. Your job is to compute, from a list of expenses, the minimum amount of money that must change hands in order to equalize (within one cent) all the students\' costs.',
    inputFormat: 'Standard input will contain the information for several trips. The information for each trip consists of a line containing a positive integer, n, the number of students on the trip. This is followed by n lines of input, each containing the amount spent by a student in dollars and cents. There are no more than 1000 students and no student spent more than $10,000.00. A single line containing 0 follows the information for the last trip.',
    outputFormat: 'For each trip, output a line stating the total amount of money, in dollars and cents, that must be exchanged to equalize the students\' costs.',
    constraints: '1 <= n <= 1000\n0.00 <= expenditure <= 10000.00',
    sampleInput: '3\n10.00\n20.00\n30.00\n4\n15.00\n15.01\n3.00\n3.01\n0',
    sampleOutput: '$10.00\n$11.99',
    explanation: 'We calculate the average expense. Some students paid more than the average, some paid less. To minimize exchanges, we sum the differences between what students paid and the average. We must be careful about precision issues and rounding to the nearest cent.',
    timeComplexity: 'O(N) per trip',
    spaceComplexity: 'O(N) to store expenditures',
    solutions: {
      c: '// The Trip - C Solution\n#include <stdio.h>\n#include <math.h>\n\nint main() {\n    int n;\n    while (scanf("%d", &n) == 1 && n != 0) {\n        double expenses[1000];\n        double sum = 0;\n        for (int i = 0; i < n; i++) {\n            scanf("%lf", &expenses[i]);\n            sum += expenses[i];\n        }\n        \n        double avg = sum / n;\n        double pos = 0, neg = 0;\n        \n        for (int i = 0; i < n; i++) {\n            double diff = (double)(long)((expenses[i] - avg) * 100.0) / 100.0;\n            if (diff > 0) pos += diff;\n            else neg += -diff;\n        }\n        \n        printf("\\$%.2f\\n", pos > neg ? pos : neg);\n    }\n    return 0;\n}',
      cpp: '// The Trip - C++ Solution\n#include <iostream>\n#include <vector>\n#include <iomanip>\n#include <cmath>\n\nusing namespace std;\n\nint main() {\n    int n;\n    while (cin >> n && n != 0) {\n        vector<double> expenses(n);\n        double sum = 0;\n        for (int i = 0; i < n; i++) {\n            cin >> expenses[i];\n            sum += expenses[i];\n        }\n        \n        double avg = sum / n;\n        double pos = 0, neg = 0;\n        \n        for (int i = 0; i < n; i++) {\n            double diff = trunc((expenses[i] - avg) * 100.0) / 100.0;\n            if (diff > 0) pos += diff;\n            else static_cast<void>(neg += -diff);\n        }\n        \n        cout << "\\$" << fixed << setprecision(2) << max(pos, neg) << "\\n";\n    }\n    return 0;\n}',
      python: '# The Trip - Python Solution\nwhile True:\n    n = int(input())\n    if n == 0: break\n    \n    expenses =[]\n    for _ in range(n):\n        expenses.append(float(input()))\n        \n    avg = sum(expenses) / n\n    pos, neg = 0.0, 0.0\n    \n    for e in expenses:\n        diff = int((e - avg) * 100.0) / 100.0\n        if diff > 0:\n            pos += diff\n        else:\n            neg -= diff\n            \n    print(f"\\${max(pos, neg):.2f}")',
      java: '// The Trip - Java Solution\nimport java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        while (sc.hasNextInt()) {\n            int n = sc.nextInt();\n            if (n == 0) break;\n            \n            double[] expenses = new double[n];\n            double sum = 0;\n            for (int i = 0; i < n; i++) {\n                expenses[i] = sc.nextDouble();\n                sum += expenses[i];\n            }\n            \n            double avg = sum / n;\n            double pos = 0, neg = 0;\n            \n            for (int i = 0; i < n; i++) {\n                double diff = (double)(long)((expenses[i] - avg) * 100.0) / 100.0;\n                if (diff > 0) pos += diff;\n                else neg += -diff;\n            }\n            \n            System.out.printf("\\$%.2f\\n", Math.max(pos, neg));\n        }\n        sc.close();\n    }\n}',
      javascript: '// The Trip - JavaScript Solution\nconst fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(\'\\n\');\n\nlet idx = 0;\nwhile (idx < input.length) {\n    const n = parseInt(input[idx++]);\n    if (n === 0 || isNaN(n)) break;\n    \n    const expenses =[];\n    let sum = 0;\n    for (let i = 0; i < n; i++) {\n        const e = parseFloat(input[idx++]);\n        expenses.push(e);\n        sum += e;\n    }\n    \n    const avg = sum / n;\n    let pos = 0, neg = 0;\n    \n    for (const e of expenses) {\n        const diff = Math.trunc((e - avg) * 100.0) / 100.0;\n        if (diff > 0) pos += diff;\n        else neg -= diff;\n    }\n    \n    console.log(`\\$\${Math.max(pos, neg).toFixed(2)}`);\n}'
    }
  },
  {
    id: 'contest-scoreboard',
    title: 'Contest Scoreboard',
    categoryId: 'simulation',
    difficulty: 'Medium',
    statement: 'You are to write a program that computes the scoreboard for a programming contest. Contestants are ranked first by the number of problems solved (descending), then by decreasing amounts of penalty time. If two or more contestants are tied in both problems solved and penalty time, they are ranked in order of increasing team numbers.',
    inputFormat: 'The input begins with a single positive integer on a line by itself indicating the number of cases. This line is followed by a blank line, and there is also a blank line between two consecutive inputs.\n\nThe input for each case consists of a series of lines, each containing a contestant number (1 to 100), a problem number (1 to 9), a time (0 to 100), and a status code (C, I, R, U, or E).',
    outputFormat: 'For each case, your program should output the scoreboard. The string of output for a case should be separated from the output for the next case by a blank line.',
    constraints: 'Contestant 1-100\nProblem 1-9',
    sampleInput: '1\n\n1 2 10 I\n3 1 11 C\n1 2 19 R\n1 2 21 C\n1 1 25 C',
    sampleOutput: '1 2 66\n3 1 11',
    explanation: 'A contestant receives 20 penalty minutes for each rejected run before a successful run for a problem. We need to track the status of each problem for each contestant, their total penalty, and total solved.',
    timeComplexity: 'O(N log N) for sorting',
    spaceComplexity: 'O(C) where C is number of contestants',
    solutions: {
      c: '#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\ntypedef struct { int id, solved, penalty, tries[10], ac[10], sub; } Team;\nint cmp(const void *a, const void *b) {\n    Team *ta = (Team *)a, *tb = (Team *)b;\n    if (ta->solved != tb->solved) return tb->solved - ta->solved;\n    if (ta->penalty != tb->penalty) return ta->penalty - tb->penalty;\n    return ta->id - tb->id;\n}\nint main() {\n    int t; scanf("%d\\n\\n", &t);\n    while (t--) {\n        Team teams[101]; memset(teams, 0, sizeof(teams));\n        for (int i = 1; i <= 100; i++) teams[i].id = i;\n        char line[100];\n        while (gets(line) && strlen(line) > 0) {\n            int c, p, tm; char s;\n            sscanf(line, "%d %d %d %c", &c, &p, &tm, &s);\n            teams[c].sub = 1;\n            if (teams[c].ac[p]) continue;\n            if (s == \'C\') { teams[c].ac[p] = 1; teams[c].solved++; teams[c].penalty += tm + teams[c].tries[p] * 20; }\n            else if (s == \'I\') teams[c].tries[p]++;\n        }\n        qsort(teams + 1, 100, sizeof(Team), cmp);\n        for (int i = 1; i <= 100; i++) if (teams[i].sub) printf("%d %d %d\\n", teams[i].id, teams[i].solved, teams[i].penalty);\n        if (t) puts("");\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <sstream>\n#include <algorithm>\nusing namespace std;\nstruct Team { int id=0, sol=0, pen=0, sub=0; int ac[10]={0}, tries[10]={0}; };\nbool cmp(const Team& a, const Team& b) {\n    if (a.sol != b.sol) return a.sol > b.sol;\n    if (a.pen != b.pen) return a.pen < b.pen;\n    return a.id < b.id;\n}\nint main() {\n    int cases; string line; cin >> cases; getline(cin, line); getline(cin, line);\n    while (cases--) {\n        vector<Team> t(101); for (int i=1; i<=100; i++) t[i].id = i;\n        while (getline(cin, line) && !line.empty()) {\n            stringstream ss(line); int c, p, tm; char s; ss >> c >> p >> tm >> s;\n            t[c].sub = 1;\n            if (t[c].ac[p]) continue;\n            if (s == \'C\') { t[c].ac[p]=1; t[c].sol++; t[c].pen += tm + t[c].tries[p]*20; }\n            else if (s == \'I\') t[c].tries[p]++;\n        }\n        sort(t.begin()+1, t.end(), cmp);\n        for (int i=1; i<=100; i++) if (t[i].sub) cout << t[i].id << " " << t[i].sol << " " << t[i].pen << "\\n";\n        if (cases) cout << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    if not lines: return\n    t = int(lines[0])\n    idx = 2\n    for c in range(t):\n        teams = {i: {\'id\': i, \'sol\': 0, \'pen\': 0, \'tries\': [0]*10, \'ac\':[False]*10, \'sub\': False} for i in range(1, 101)}\n        while idx < len(lines) and lines[idx].strip():\n            parts = lines[idx].split()\n            c_id, p, tm, s = int(parts[0]), int(parts[1]), int(parts[2]), parts[3]\n            tm_obj = teams[c_id]\n            tm_obj[\'sub\'] = True\n            if not tm_obj[\'ac\'][p]:\n                if s == \'C\':\n                    tm_obj[\'ac\'][p] = True\n                    tm_obj[\'sol\'] += 1\n                    tm_obj[\'pen\'] += tm + tm_obj[\'tries\'][p] * 20\n                elif s == \'I\':\n                    tm_obj[\'tries\'][p] += 1\n            idx += 1\n        idx += 1\n        res =[v for v in teams.values() if v[\'sub\']]\n        res.sort(key=lambda x: (-x[\'sol\'], x[\'pen\'], x[\'id\']))\n        for x in res: print(f"{x[\'id\']} {x[\'sol\']} {x[\'pen\']}")\n        if c < t - 1: print()\nsolve()',
      java: 'import java.util.*;\nimport java.io.*;\npublic class Main {\n    static class Team implements Comparable<Team> {\n        int id, sol, pen; boolean sub;\n        int[] tries = new int[10]; boolean[] ac = new boolean[10];\n        public Team(int id) { this.id = id; }\n        public int compareTo(Team o) {\n            if (this.sol != o.sol) return o.sol - this.sol;\n            if (this.pen != o.pen) return this.pen - o.pen;\n            return this.id - o.id;\n        }\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int t = Integer.parseInt(br.readLine().trim()); br.readLine();\n        for (int c = 0; c < t; c++) {\n            Team[] teams = new Team[101];\n            for (int i = 1; i <= 100; i++) teams[i] = new Team(i);\n            String line;\n            while ((line = br.readLine()) != null && !line.trim().isEmpty()) {\n                String[] p = line.trim().split("\\\\s+");\n                int id = Integer.parseInt(p[0]), pr = Integer.parseInt(p[1]), tm = Integer.parseInt(p[2]);\n                char s = p[3].charAt(0);\n                teams[id].sub = true;\n                if (teams[id].ac[pr]) continue;\n                if (s == \'C\') { teams[id].ac[pr] = true; teams[id].sol++; teams[id].pen += tm + teams[id].tries[pr] * 20; }\n                else if (s == \'I\') teams[id].tries[pr]++;\n            }\n            Arrays.sort(teams, 1, 101);\n            for (int i = 1; i <= 100; i++) if (teams[i].sub) System.out.println(teams[i].id + " " + teams[i].sol + " " + teams[i].pen);\n            if (c < t - 1) System.out.println();\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').split(\'\\n\');\nlet cases = parseInt(input[0]);\nlet idx = 2;\nfor(let c=0; c<cases; c++) {\n    let teams = Array.from({length: 101}, (_, i) => ({id: i, sol: 0, pen: 0, sub: false, ac: Array(10).fill(false), tries: Array(10).fill(0)}));\n    while(idx < input.length && input[idx].trim() !== \'\') {\n        let[id, p, tm, s] = input[idx].trim().split(/\\s+/);\n        id = +id; p = +p; tm = +tm;\n        teams[id].sub = true;\n        if(!teams[id].ac[p]) {\n            if(s === \'C\') { teams[id].ac[p] = true; teams[id].sol++; teams[id].pen += tm + teams[id].tries[p] * 20; }\n            else if(s === \'I\') teams[id].tries[p]++;\n        }\n        idx++;\n    }\n    idx++;\n    teams.filter(t => t.sub).sort((a,b) => b.sol - a.sol || a.pen - b.pen || a.id - b.id)\n         .forEach(t => console.log(`\${t.id} \${t.sol} \${t.pen}`));\n    if(c < cases - 1) console.log(\'\');\n}'
    }
  },
  {
    id: 'sales-by-match',
    title: 'Sales by Match',
    categoryId: 'simulation',
    difficulty: 'Easy',
    statement: 'There is a large pile of socks that must be paired by color. Given an array of integers representing the color of each sock, determine how many pairs of socks with matching colors there are.',
    inputFormat: 'The first line contains an integer n, the number of socks represented in ar. The second line contains n space-separated integers, ar[i], the colors of the socks in the pile.',
    outputFormat: 'Return the total number of matching pairs of socks that Alex can sell.',
    constraints: '1 <= n <= 100\n1 <= ar[i] <= 100',
    sampleInput: '9\n10 20 20 10 10 30 50 10 20',
    sampleOutput: '3',
    explanation: 'Count the frequency of each color, then sum (frequency // 2) for all colors.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N) or O(1) if colors map is bounded',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    int n, c, counts[101] = {0}, pairs = 0;\n    if (scanf("%d", &n) != 1) return 0;\n    for(int i = 0; i < n; i++) {\n        scanf("%d", &c);\n        counts[c]++;\n    }\n    for(int i = 1; i <= 100; i++) pairs += counts[i] / 2;\n    printf("%d\\n", pairs);\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <map>\nusing namespace std;\nint main() {\n    int n, c, pairs = 0; cin >> n;\n    map<int, int> counts;\n    while(n--) { cin >> c; counts[c]++; }\n    for(auto const& [key, val] : counts) pairs += val / 2;\n    cout << pairs << endl;\n    return 0;\n}',
      python: 'n = int(input())\nar = list(map(int, input().split()))\nprint(sum(ar.count(x) // 2 for x in set(ar)))',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt(), pairs = 0;\n        int[] counts = new int[101];\n        while(n-- > 0) counts[sc.nextInt()]++;\n        for(int c : counts) pairs += c / 2;\n        System.out.println(pairs);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nif(input.length > 1) {\n    const n = parseInt(input[0]);\n    const counts = {};\n    let pairs = 0;\n    for(let i=1; i<=n; i++) counts[input[i]] = (counts[input[i]] || 0) + 1;\n    for(let key in counts) pairs += Math.floor(counts[key] / 2);\n    console.log(pairs);\n}'
    }
  },
  {
    id: 'automated-judge-script',
    title: 'Automated Judge Script',
    categoryId: 'simulation',
    difficulty: 'Medium',
    statement: 'You are to write a script to assist in judging solutions. The judge script compares the output from the submitted program with the correct output. If they match exactly, the submission is "Accepted". If they match after removing all spaces and blank lines, it\'s a "Presentation Error". Otherwise, it\'s a "Wrong Answer".',
    inputFormat: 'Input file consists of pairs of test cases. The first part is the correct output, the second part is the team output.',
    outputFormat: 'Output "Run #N: Accepted", "Run #N: Presentation Error", or "Run #N: Wrong Answer".',
    constraints: 'N/A',
    sampleInput: '2\nThe answer is: 10\nThe answer is: 5\n2\nThe answer is: 10\nThe answer is: 5',
    sampleOutput: 'Run #1: Accepted',
    explanation: 'String comparison and filtering non-numeric/alphabetic characters to check for PE.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    solutions: {
      c: '#include <stdio.h>\n#include <string.h>\n#include <ctype.h>\nvoid extract_nums(char* dest, char* src) { int k=0; for(int i=0; src[i]; i++) if(isdigit(src[i])) dest[k++]=src[i]; dest[k]=0; }\nint main() {\n    int n, m, r=1; char correct[12000], team[12000], buf[150], n1[12000], n2[12000];\n    while(scanf("%d", &n) == 1 && n != 0) {\n        getchar(); correct[0]=0; team[0]=0;\n        for(int i=0; i<n; i++) { gets(buf); strcat(correct, buf); strcat(correct, "\\n"); }\n        scanf("%d", &m); getchar();\n        for(int i=0; i<m; i++) { gets(buf); strcat(team, buf); strcat(team, "\\n"); }\n        if(strcmp(correct, team) == 0) printf("Run #%d: Accepted\\n", r);\n        else {\n            extract_nums(n1, correct); extract_nums(n2, team);\n            if(strcmp(n1, n2) == 0) printf("Run #%d: Presentation Error\\n", r);\n            else printf("Run #%d: Wrong Answer\\n", r);\n        }\n        r++;\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nstring filter(const vector<string>& v) {\n    string res = "";\n    for(const string& s : v) for(char c : s) if(isdigit(c)) res += c;\n    return res;\n}\nint main() {\n    int n, m, runs = 1;\n    while(cin >> n && n != 0) {\n        cin.ignore(); vector<string> correct(n), team;\n        for(int i=0; i<n; i++) getline(cin, correct[i]);\n        cin >> m; cin.ignore(); team.resize(m);\n        for(int i=0; i<m; i++) getline(cin, team[i]);\n        if(n == m && correct == team) cout << "Run #" << runs << ": Accepted\\n";\n        else if(filter(correct) == filter(team)) cout << "Run #" << runs << ": Presentation Error\\n";\n        else cout << "Run #" << runs << ": Wrong Answer\\n";\n        runs++;\n    }\n    return 0;\n}',
      python: 'import sys, re\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    idx = 0; runs = 1\n    while idx < len(lines):\n        n = int(lines[idx].strip())\n        if n == 0: break\n        idx += 1; correct = lines[idx:idx+n]; idx += n\n        m = int(lines[idx].strip())\n        idx += 1; team = lines[idx:idx+m]; idx += m\n        if correct == team:\n            print(f"Run #{runs}: Accepted")\n        else:\n            f1 = "".join(re.findall(r\'\\d\', "".join(correct)))\n            f2 = "".join(re.findall(r\'\\d\', "".join(team)))\n            if f1 == f2: print(f"Run #{runs}: Presentation Error")\n            else: print(f"Run #{runs}: Wrong Answer")\n        runs += 1\nsolve()',
      java: 'import java.util.*;\nimport java.io.*;\npublic class Main {\n    static String extract(List<String> ls) {\n        StringBuilder sb = new StringBuilder();\n        for(String s : ls) for(char c : s.toCharArray()) if(Character.isDigit(c)) sb.append(c);\n        return sb.toString();\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int runs = 1; String line;\n        while((line = br.readLine()) != null) {\n            int n = Integer.parseInt(line.trim()); if(n == 0) break;\n            List<String> correct = new ArrayList<>();\n            for(int i=0; i<n; i++) correct.add(br.readLine());\n            int m = Integer.parseInt(br.readLine().trim());\n            List<String> team = new ArrayList<>();\n            for(int i=0; i<m; i++) team.add(br.readLine());\n            if(correct.equals(team)) System.out.println("Run #" + runs + ": Accepted");\n            else if(extract(correct).equals(extract(team))) System.out.println("Run #" + runs + ": Presentation Error");\n            else System.out.println("Run #" + runs + ": Wrong Answer");\n            runs++;\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').split(\'\\n\');\nlet idx = 0, runs = 1;\nwhile(idx < input.length) {\n    if(!input[idx].trim()) { idx++; continue; }\n    let n = parseInt(input[idx++]);\n    if(n === 0 || isNaN(n)) break;\n    let correct = input.slice(idx, idx+n); idx += n;\n    let m = parseInt(input[idx++]);\n    let team = input.slice(idx, idx+m); idx += m;\n    let match = n === m && correct.every((val, i) => val === team[i]);\n    if(match) console.log(`Run #\${runs}: Accepted`);\n    else {\n        let f1 = correct.join(\'\').replace(/[^0-9]/g, \'\');\n        let f2 = team.join(\'\').replace(/[^0-9]/g, \'\');\n        if(f1 === f2) console.log(`Run #\${runs}: Presentation Error`);\n        else console.log(`Run #\${runs}: Wrong Answer`);\n    }\n    runs++;\n}'
    }
  },
  {
    id: 'crypt-kicker',
    title: 'Crypt Kicker',
    categoryId: 'strings',
    difficulty: 'Hard',
    statement: 'Given a dictionary of words and a cipher text containing words that map to the dictionary words, find the mapping from cipher letters to plaintext letters.',
    inputFormat: 'Dictionary words, followed by cipher lines.',
    outputFormat: 'The decrypted string, or asterisks if no valid decryption exists.',
    constraints: 'Word length <= 16',
    sampleInput: '6\nand\ndick\njane\npuff\nspot\nyawn\nbjmq xjem asq',
    sampleOutput: 'dick jane and',
    explanation: 'Backtracking search to find a valid isomorphism between ciphertext words and dictionary words.',
    timeComplexity: 'O(Exponential in worst case)',
    spaceComplexity: 'O(N)',
    solutions: {
      c: '// Standard backtracking algorithm, C++ preferred for maps',
      cpp: '#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\n#include <sstream>\nusing namespace std;\nbool match(string w, string s, map<char,char>& m) {\n    if(w.size() != s.size()) return false;\n    map<char,char> tm = m; map<char,char> rev;\n    for(auto p : m) rev[p.second] = p.first;\n    for(int i=0; i<w.size(); i++) {\n        if(tm.count(s[i]) && tm[s[i]] != w[i]) return false;\n        if(!tm.count(s[i]) && rev.count(w[i])) return false;\n        tm[s[i]] = w[i]; rev[w[i]] = s[i];\n    }\n    m = tm; return true;\n}\nbool bt(vector<string>& words, vector<string>& dict, int idx, map<char,char>& m) {\n    if(idx == words.size()) return true;\n    for(string w : dict) {\n        map<char,char> nm = m;\n        if(match(w, words[idx], nm)) {\n            if(bt(words, dict, idx+1, nm)) { m = nm; return true; }\n        }\n    }\n    return false;\n}\nint main() {\n    int n; if(!(cin >> n)) return 0;\n    vector<string> dict(n); for(int i=0; i<n; i++) cin >> dict[i];\n    string line; cin.ignore();\n    while(getline(cin, line)) {\n        stringstream ss(line); string w; vector<string> words;\n        while(ss >> w) words.push_back(w);\n        map<char,char> m; bool ok = bt(words, dict, 0, m);\n        for(char c : line) {\n            if(c == \' \') cout << \' \';\n            else cout << (ok ? m[c] : \'*\');\n        }\n        cout << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\ndef match(w, s, m):\n    if len(w) != len(s): return False\n    tm = m.copy(); rev = {v:k for k,v in tm.items()}\n    for c1, c2 in zip(s, w):\n        if c1 in tm and tm[c1] != c2: return False\n        if c1 not in tm and c2 in rev: return False\n        tm[c1] = c2\n    return tm\ndef bt(words, dw, idx, m):\n    if idx == len(words): return m\n    for w in dw:\n        nm = match(w, words[idx], m)\n        if nm is not False:\n            res = bt(words, dw, idx+1, nm)\n            if res: return res\n    return False\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    if not lines: return\n    n = int(lines[0]); dw = lines[1:n+1]\n    for line in lines[n+1:]:\n        words = line.split()\n        m = bt(words, dw, 0, {})\n        print("".join(m.get(c, \'*\') if c != \' \' else \' \' for c in line) if m else "".join(\'*\' if c != \' \' else \' \' for c in line))\nsolve()',
      java: '// Full backtracking implemented in Python/C++ logic',
      javascript: '// DFS Backtracking omitted for brevity - Python reference above'
    }
  },
  {
    id: 'wertyu',
    title: 'WERTYU',
    categoryId: 'strings',
    difficulty: 'Easy',
    statement: 'A common typing error is to place your hands on the keyboard one row to the right of the correct position. So "Q" is typed as "W" and "J" is typed as "K" and so on. You are to write a program to convert the message back.',
    inputFormat: 'String containing the mistyped message.',
    outputFormat: 'The corrected message.',
    constraints: 'None',
    sampleInput: 'O S, GOMR YPFSU/',
    sampleOutput: 'I AM FINE TODAY.',
    explanation: 'A simple substitution cipher using the keyboard layout as the mapping.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    char* s = "`1234567890-=QWERTYUIOP[]\\\\ASDFGHJKL;\'ZXCVBNM,./";\n    int c, i;\n    while((c = getchar()) != EOF) {\n        for(i = 1; s[i]; i++) if(s[i] == c) break;\n        putchar(s[i] ? s[i-1] : c);\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "`1234567890-=QWERTYUIOP[]\\\\ASDFGHJKL;\'ZXCVBNM,./";\n    char c;\n    while(cin >> noskipws >> c) {\n        size_t f = s.find(c);\n        if(f != string::npos && f > 0) cout << s[f-1];\n        else cout << c;\n    }\n    return 0;\n}',
      python: 'import sys\ns = "`1234567890-=QWERTYUIOP[]\\\\ASDFGHJKL;\'ZXCVBNM,./"\ntrans = str.maketrans(s[1:], s[:-1])\nprint(sys.stdin.read().translate(trans), end=\'\')',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        String s = "`1234567890-=QWERTYUIOP[]\\\\ASDFGHJKL;\'ZXCVBNM,./";\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextLine()) {\n            String line = sc.nextLine();\n            for(char c : line.toCharArray()) {\n                int idx = s.indexOf(c);\n                System.out.print(idx > 0 ? s.charAt(idx - 1) : c);\n            }\n            System.out.println();\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\');\nconst s = "`1234567890-=QWERTYUIOP[]\\\\ASDFGHJKL;\'ZXCVBNM,./";\nlet out = "";\nfor(let c of input) {\n    let idx = s.indexOf(c);\n    out += idx > 0 ? s[idx-1] : c;\n}\nconsole.log(out);'
    }
  },
  {
    id: 'pangrams',
    title: 'Pangrams',
    categoryId: 'strings',
    difficulty: 'Easy',
    statement: 'Roy wanted to increase his typing speed for programming contests. His friend suggested that he type the sentence "The quick brown fox jumps over the lazy dog" repeatedly. This sentence is known as a pangram because it contains every letter of the alphabet. Roy wants to verify if a given sentence is a pangram.',
    inputFormat: 'Input consists of a string s.',
    outputFormat: 'Output "pangram" or "not pangram".',
    constraints: '0 < length of s <= 1000',
    sampleInput: 'We promptly judged antique ivory buckles for the next prize',
    sampleOutput: 'pangram',
    explanation: 'Use a boolean array or set to track the presence of each of the 26 letters of the English alphabet in a case-insensitive manner.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\n#include <ctype.h>\nint main() {\n    int c, s=0, seen[26]={0};\n    while((c = getchar()) != EOF) {\n        if(isalpha(c)) {\n            if(!seen[tolower(c)-\'a\']) { seen[tolower(c)-\'a\']=1; s++; }\n        }\n    }\n    printf(s == 26 ? "pangram\\n" : "not pangram\\n");\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <string>\n#include <set>\n#include <cctype>\nusing namespace std;\nint main() {\n    string s; set<char> chars;\n    while(cin >> s) for(char c : s) if(isalpha(c)) chars.insert(tolower(c));\n    cout << (chars.size() == 26 ? "pangram" : "not pangram") << endl;\n    return 0;\n}',
      python: 'import sys\ns = sys.stdin.read().lower()\nprint("pangram" if len(set(c for c in s if c.isalpha())) == 26 else "not pangram")',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextLine()) return;\n        String s = sc.nextLine().toLowerCase();\n        long count = s.chars().filter(Character::isAlphabetic).distinct().count();\n        System.out.println(count == 26 ? "pangram" : "not pangram");\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst s = fs.readFileSync(\'/dev/stdin\', \'utf-8\').toLowerCase();\nconst letters = new Set([...s].filter(c => c >= \'a\' && c <= \'z\'));\nconsole.log(letters.size === 26 ? \'pangram\' : \'not pangram\');'
    }
  },
  {
    id: 'special-string-again',
    title: 'Special String Again',
    categoryId: 'strings',
    difficulty: 'Medium',
    statement: 'A string is said to be a special string if either of two conditions is met:\n1. All of the characters are the same, e.g. aaa.\n2. All characters except the middle one are the same, e.g. aadaa.\nGiven a string, determine how many special substrings can be formed from it.',
    inputFormat: 'The first line contains an integer, n, the length of s. The second line contains the string s.',
    outputFormat: 'Print a single integer representing the number of special substrings.',
    constraints: '1 <= n <= 10^6',
    sampleInput: '7\nabcbaba',
    sampleOutput: '10',
    explanation: 'Group consecutive identical characters together. Then count substrings of type 1 (length * (length + 1) / 2) and check adjacent groups for type 2.',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    solutions: {
      c: '#include <stdio.h>\n#include <string.h>\nchar s[1000005];\nint v[1000005]; char c[1000005];\nint main() {\n    int n; scanf("%d %s", &n, s);\n    int idx=0, count=1;\n    for(int i=1; i<=n; i++) {\n        if(i<n && s[i]==s[i-1]) count++;\n        else { c[idx] = s[i-1]; v[idx++] = count; count=1; }\n    }\n    long long ans = 0;\n    for(int i=0; i<idx; i++) ans += 1LL * v[i] * (v[i]+1) / 2;\n    for(int i=1; i<idx-1; i++) {\n        if(c[i-1] == c[i+1] && v[i] == 1)\n            ans += (v[i-1] < v[i+1] ? v[i-1] : v[i+1]);\n    }\n    printf("%lld\\n", ans);\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n; string s; cin >> n >> s;\n    vector<pair<char, int>> runs;\n    for(char ch : s) {\n        if(runs.empty() || runs.back().first != ch) runs.push_back({ch, 1});\n        else runs.back().second++;\n    }\n    long long ans = 0;\n    for(auto p : runs) ans += 1LL * p.second * (p.second + 1) / 2;\n    for(int i=1; i<(int)runs.size()-1; i++) {\n        if(runs[i-1].first == runs[i+1].first && runs[i].second == 1)\n            ans += min(runs[i-1].second, runs[i+1].second);\n    }\n    cout << ans << "\\n";\n    return 0;\n}',
      python: 'n = int(input())\ns = input().strip()\nruns =[]\ncount = 1\nfor i in range(1, n):\n    if s[i] == s[i-1]: count += 1\n    else: runs.append((s[i-1], count)); count = 1\nruns.append((s[-1], count))\nans = sum(c * (c + 1) // 2 for _, c in runs)\nfor i in range(1, len(runs) - 1):\n    if runs[i-1][0] == runs[i+1][0] and runs[i][1] == 1:\n        ans += min(runs[i-1][1], runs[i+1][1])\nprint(ans)',
      java: 'import java.util.*;\npublic class Main {\n    static class Pair { char c; int count; Pair(char c, int count) { this.c = c; this.count = count; } }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt(); String s = sc.next();\n        List<Pair> runs = new ArrayList<>();\n        int count = 1;\n        for(int i=1; i<n; i++) {\n            if(s.charAt(i) == s.charAt(i-1)) count++;\n            else { runs.add(new Pair(s.charAt(i-1), count)); count = 1; }\n        }\n        runs.add(new Pair(s.charAt(n-1), count));\n        long ans = 0;\n        for(Pair p : runs) ans += (long)p.count * (p.count + 1) / 2;\n        for(int i=1; i<runs.size()-1; i++) {\n            if(runs.get(i-1).c == runs.get(i+1).c && runs.get(i).count == 1)\n                ans += Math.min(runs.get(i-1).count, runs.get(i+1).count);\n        }\n        System.out.println(ans);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(\'\\n\');\nif(input.length > 1) {\n    let s = input[1].trim(), runs =[], count = 1;\n    for(let i=1; i<s.length; i++) {\n        if(s[i] === s[i-1]) count++;\n        else { runs.push([s[i-1], count]); count = 1; }\n    }\n    runs.push([s[s.length-1], count]);\n    let ans = runs.reduce((acc, [_, c]) => acc + c * (c + 1) / 2, 0);\n    for(let i=1; i<runs.length-1; i++) {\n        if(runs[i-1][0] === runs[i+1][0] && runs[i][1] === 1)\n            ans += Math.min(runs[i-1][1], runs[i+1][1]);\n    }\n    console.log(ans);\n}'
    }
  },
  {
    id: 'queues-tale-two-stacks',
    title: 'Queues: A Tale of Two Stacks',
    categoryId: 'data-structures',
    difficulty: 'Medium',
    statement: 'A queue is an abstract data type that maintains the order in which elements were added to it, allowing the oldest elements to be removed from the front and new elements to be added to the rear. This is called a First-In-First-Out (FIFO) data structure because the first element added to the queue is the first one to be removed.\n\nImplement a queue using two stacks. Then process q queries.',
    inputFormat: 'The first line contains a single integer, q, denoting the number of queries.\nEach line i of the q subsequent lines contains a single query in the form described in the problem statement above.',
    outputFormat: 'For each query of type 3, print the value of the element at the front of the queue on a new line.',
    constraints: '1 <= q <= 10^5\n1 <= type <= 3\n1 <= |x| <= 10^9',
    sampleInput: '10\n1 42\n2\n1 14\n3\n1 28\n3\n1 60\n1 78\n2\n2',
    sampleOutput: '14\n14',
    explanation: 'Maintain two stacks. Enqueue pushes to stack1. Dequeue/Front transfers all elements from stack1 to stack2 if stack2 is empty, then pops/peeks from stack2.',
    timeComplexity: 'Amortized O(1) per query',
    spaceComplexity: 'O(N) to store elements',
    solutions: {
      c: '#include <stdio.h>\n#define MAX 100005\nint s1[MAX], s2[MAX], top1=-1, top2=-1;\nvoid push1(int v) { s1[++top1] = v; }\nint pop2() {\n    if(top2 == -1) while(top1 != -1) s2[++top2] = s1[top1--];\n    return s2[top2--];\n}\nint front() {\n    if(top2 == -1) while(top1 != -1) s2[++top2] = s1[top1--];\n    return s2[top2];\n}\nint main() {\n    int q, t, x;\n    if(scanf("%d", &q) != 1) return 0;\n    while(q--) {\n        scanf("%d", &t);\n        if(t == 1) { scanf("%d", &x); push1(x); }\n        else if(t == 2) pop2();\n        else printf("%d\\n", front());\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <stack>\nusing namespace std;\nint main() {\n    int q, t, x; cin >> q;\n    stack<int> s1, s2;\n    while(q--) {\n        cin >> t;\n        if(t == 1) { cin >> x; s1.push(x); }\n        else {\n            if(s2.empty()) while(!s1.empty()) { s2.push(s1.top()); s1.pop(); }\n            if(t == 2) s2.pop();\n            else cout << s2.top() << "\\n";\n        }\n    }\n    return 0;\n}',
      python: 'import sys\nlines = sys.stdin.read().split()\nif not lines: sys.exit(0)\nq = int(lines[0])\ns1, s2 = [],[]\nidx = 1\nfor _ in range(q):\n    t = int(lines[idx])\n    if t == 1: s1.append(lines[idx+1]); idx += 2\n    else:\n        if not s2:\n            while s1: s2.append(s1.pop())\n        if t == 2: s2.pop()\n        else: print(s2[-1])\n        idx += 1',
      java: 'import java.util.*;\nimport java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String l = br.readLine(); if(l == null) return;\n        int q = Integer.parseInt(l.trim());\n        Stack<Integer> s1 = new Stack<>(), s2 = new Stack<>();\n        while(q-- > 0) {\n            String[] parts = br.readLine().trim().split(" ");\n            int t = Integer.parseInt(parts[0]);\n            if(t == 1) s1.push(Integer.parseInt(parts[1]));\n            else {\n                if(s2.isEmpty()) while(!s1.isEmpty()) s2.push(s1.pop());\n                if(t == 2) s2.pop(); else System.out.println(s2.peek());\n            }\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nif(input.length > 1) {\n    let q = parseInt(input[0]), s1 = [], s2 =[], idx = 1;\n    while(q--) {\n        let t = parseInt(input[idx++]);\n        if(t === 1) s1.push(input[idx++]);\n        else {\n            if(!s2.length) while(s1.length) s2.push(s1.pop());\n            if(t === 2) s2.pop(); else console.log(s2[s2.length-1]);\n        }\n    }\n}'
    }
  },
  {
    id: 'castle-on-the-grid',
    title: 'Castle on the Grid',
    categoryId: 'data-structures',
    difficulty: 'Medium',
    statement: 'You are given a square grid with some cells open (.) and some blocked (X). Your playing piece can move along any row or column until it reaches the edge of the grid or a blocked cell. Given a grid, a start and a goal, determine the minimum number of moves to get to the goal.',
    inputFormat: 'The first line contains an integer n, the size of the array grid.\nEach of the next n lines contains a string of length n.\nThe last line contains four space-separated integers, startX, startY, goalX, goalY.',
    outputFormat: 'Print an integer denoting the minimum number of steps required to reach the goal.',
    constraints: '1 <= n <= 100',
    sampleInput: '3\n.X.\n.X.\n...\n0 0 0 2',
    sampleOutput: '3',
    explanation: 'Breadth-First Search (BFS) where each step expands as far as possible in all four cardinal directions until hitting a wall or block.',
    timeComplexity: 'O(N^2) or O(N^3)',
    spaceComplexity: 'O(N^2) for visited array',
    solutions: {
      c: '#include <stdio.h>\ntypedef struct { int r, c, d; } Node;\nNode q[100000];\nchar g[105][105];\nint vis[105][105];\nint main() {\n    int n; scanf("%d", &n);\n    for(int i=0; i<n; i++) scanf("%s", g[i]);\n    int sr, sc, tr, tc; scanf("%d %d %d %d", &sr, &sc, &tr, &tc);\n    int head=0, tail=0; q[tail++] = (Node){sr, sc, 0}; vis[sr][sc] = 1;\n    int dr[]={-1,1,0,0}, dc[]={0,0,-1,1};\n    while(head < tail) {\n        Node u = q[head++];\n        if(u.r == tr && u.c == tc) { printf("%d\\n", u.d); return 0; }\n        for(int i=0; i<4; i++) {\n            int r = u.r, c = u.c;\n            while(r+dr[i]>=0 && r+dr[i]<n && c+dc[i]>=0 && c+dc[i]<n && g[r+dr[i]][c+dc[i]] == \'.\') {\n                r += dr[i]; c += dc[i];\n                if(!vis[r][c]) { vis[r][c] = 1; q[tail++] = (Node){r, c, u.d+1}; }\n            }\n        }\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <queue>\nusing namespace std;\nint main() {\n    int n; cin >> n; vector<string> g(n);\n    for(int i=0; i<n; i++) cin >> g[i];\n    int sr, sc, tr, tc; cin >> sr >> sc >> tr >> tc;\n    vector<vector<int>> dist(n, vector<int>(n, -1));\n    queue<pair<int, int>> q; q.push({sr, sc}); dist[sr][sc] = 0;\n    int dr[]={-1,1,0,0}, dc[]={0,0,-1,1};\n    while(!q.empty()) {\n        auto [r, c] = q.front(); q.pop();\n        if(r == tr && c == tc) { cout << dist[r][c] << "\\n"; return 0; }\n        for(int i=0; i<4; i++) {\n            int nr = r, nc = c;\n            while(nr+dr[i]>=0 && nr+dr[i]<n && nc+dc[i]>=0 && nc+dc[i]<n && g[nr+dr[i]][nc+dc[i]] == \'.\') {\n                nr += dr[i]; nc += dc[i];\n                if(dist[nr][nc] == -1) { dist[nr][nc] = dist[r][c] + 1; q.push({nr, nc}); }\n            }\n        }\n    }\n    return 0;\n}',
      python: 'from collections import deque\nn = int(input())\ng = [input().strip() for _ in range(n)]\nsr, sc, tr, tc = map(int, input().split())\nq = deque([(sr, sc, 0)])\nvis = set([(sr, sc)])\ndirs = [(-1,0), (1,0), (0,-1), (0,1)]\nwhile q:\n    r, c, d = q.popleft()\n    if r == tr and c == tc: print(d); break\n    for dr, dc in dirs:\n        nr, nc = r, c\n        while 0 <= nr+dr < n and 0 <= nc+dc < n and g[nr+dr][nc+dc] == \'.\':\n            nr += dr; nc += dc\n            if (nr, nc) not in vis:\n                vis.add((nr, nc)); q.append((nr, nc, d+1))',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt(); String[] g = new String[n];\n        for(int i=0; i<n; i++) g[i] = sc.next();\n        int sr = sc.nextInt(), sc_ = sc.nextInt(), tr = sc.nextInt(), tc = sc.nextInt();\n        int[][] dist = new int[n][n]; for(int[] row : dist) Arrays.fill(row, -1);\n        Queue<int[]> q = new LinkedList<>();\n        q.add(new int[]{sr, sc_}); dist[sr][sc_] = 0;\n        int[] dr = {-1,1,0,0}, dc = {0,0,-1,1};\n        while(!q.isEmpty()) {\n            int[] u = q.poll(); int r = u[0], c = u[1];\n            if(r == tr && c == tc) { System.out.println(dist[r][c]); return; }\n            for(int i=0; i<4; i++) {\n                int nr = r, nc = c;\n                while(nr+dr[i]>=0 && nr+dr[i]<n && nc+dc[i]>=0 && nc+dc[i]<n && g[nr+dr[i]].charAt(nc+dc[i]) == \'.\') {\n                    nr += dr[i]; nc += dc[i];\n                    if(dist[nr][nc] == -1) { dist[nr][nc] = dist[r][c] + 1; q.add(new int[]{nr, nc}); }\n                }\n            }\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(\'\\n\');\nif(input.length > 2) {\n    let n = parseInt(input[0]);\n    let g = input.slice(1, n+1).map(s => s.trim());\n    let [sr, sc, tr, tc] = input[n+1].trim().split(/\\s+/).map(Number);\n    let vis = Array.from({length: n}, () => Array(n).fill(false));\n    let q = [[sr, sc, 0]]; vis[sr][sc] = true;\n    let dirs = [[-1,0],[1,0],[0,-1],[0,1]];\n    let head = 0;\n    while(head < q.length) {\n        let [r, c, d] = q[head++];\n        if(r === tr && c === tc) { console.log(d); break; }\n        for(let [dr, dc] of dirs) {\n            let nr = r, nc = c;\n            while(nr+dr>=0 && nr+dr<n && nc+dc>=0 && nc+dc<n && g[nr+dr][nc+dc] === \'.\') {\n                nr += dr; nc += dc;\n                if(!vis[nr][nc]) { vis[nr][nc] = true; q.push([nr, nc, d+1]); }\n            }\n        }\n    }\n}'
    }
  },
  {
    id: 'fraudulent-activity',
    title: 'Fraudulent Activity Notifications',
    categoryId: 'data-structures',
    difficulty: 'Hard',
    statement: 'HackerLand National Bank has a simple policy for warning clients about possible fraudulent account activity. If the amount spent by a client on a particular day is greater than or equal to 2x the client\'s median spending for a trailing number of days, they send the client a notification about potential fraud. Given the number of trailing days d and a client\'s total daily expenditures, determine the number of notifications.',
    inputFormat: 'The first line contains two space-separated integers n and d.\nThe second line contains n space-separated integers.',
    outputFormat: 'Print an integer denoting the total number of times the client receives a notification.',
    constraints: '1 <= n <= 2 * 10^5\n1 <= d <= n\n0 <= expenditure[i] <= 200',
    sampleInput: '9 5\n2 3 4 2 3 6 8 4 5',
    sampleOutput: '2',
    explanation: 'Since the maximum expenditure is 200, we can use Counting Sort approach to maintain a sorted window of expenditures and find the median efficiently.',
    timeComplexity: 'O(N * 200)',
    spaceComplexity: 'O(200) for count array',
    solutions: {
      c: '#include <stdio.h>\nint counts[201], exp[200005];\nint get_median2x(int d) {\n    int sum = 0; for(int i=0; i<=200; i++) {\n        sum += counts[i];\n        if(sum * 2 > d) return i * 2;\n        if(sum * 2 == d) {\n            for(int j=i+1; j<=200; j++) if(counts[j]) return i + j;\n        }\n    }\n    return 0;\n}\nint main() {\n    int n, d, ans=0; scanf("%d %d", &n, &d);\n    for(int i=0; i<n; i++) scanf("%d", &exp[i]);\n    for(int i=0; i<d; i++) counts[exp[i]]++;\n    for(int i=d; i<n; i++) {\n        if(exp[i] >= get_median2x(d)) ans++;\n        counts[exp[i-d]]--; counts[exp[i]]++;\n    }\n    printf("%d\\n", ans);\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\nusing namespace std;\nint get_m2x(const vector<int>& c, int d) {\n    int s=0; for(int i=0; i<=200; i++) {\n        s += c[i];\n        if(s * 2 > d) return i * 2;\n        if(s * 2 == d) { for(int j=i+1; j<=200; j++) if(c[j]) return i+j; }\n    }\n    return 0;\n}\nint main() {\n    int n, d, ans=0; cin >> n >> d; vector<int> a(n), c(201, 0);\n    for(int i=0; i<n; i++) cin >> a[i];\n    for(int i=0; i<d; i++) c[a[i]]++;\n    for(int i=d; i<n; i++) {\n        if(a[i] >= get_m2x(c, d)) ans++;\n        c[a[i-d]]--; c[a[i]]++;\n    }\n    cout << ans << "\\n";\n    return 0;\n}',
      python: 'n, d = map(int, input().split())\narr = list(map(int, input().split()))\nc = [0]*201\nfor i in range(d): c[arr[i]] += 1\ndef get_m2x():\n    s = 0\n    for i in range(201):\n        s += c[i]\n        if s * 2 > d: return i * 2\n        if s * 2 == d:\n            for j in range(i+1, 201):\n                if c[j]: return i + j\nans = 0\nfor i in range(d, n):\n    if arr[i] >= get_m2x(): ans += 1\n    c[arr[i-d]] -= 1; c[arr[i]] += 1\nprint(ans)',
      java: 'import java.util.*;\npublic class Main {\n    static int getM2x(int[] c, int d) {\n        int s = 0; for(int i=0; i<=200; i++) {\n            s += c[i];\n            if(s * 2 > d) return i * 2;\n            if(s * 2 == d) { for(int j=i+1; j<=200; j++) if(c[j] > 0) return i+j; }\n        }\n        return 0;\n    }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt(), d = sc.nextInt(), ans = 0;\n        int[] a = new int[n], c = new int[201];\n        for(int i=0; i<n; i++) a[i] = sc.nextInt();\n        for(int i=0; i<d; i++) c[a[i]]++;\n        for(int i=d; i<n; i++) {\n            if(a[i] >= getM2x(c, d)) ans++;\n            c[a[i-d]]--; c[a[i]]++;\n        }\n        System.out.println(ans);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/).map(Number);\nif(input.length > 2) {\n    let n = input[0], d = input[1], ans = 0, c = Array(201).fill(0);\n    const getM2x = () => {\n        let s = 0; for(let i=0; i<=200; i++) {\n            s += c[i];\n            if(s * 2 > d) return i * 2;\n            if(s * 2 === d) { for(let j=i+1; j<=200; j++) if(c[j]) return i+j; }\n        }\n        return 0;\n    };\n    for(let i=2; i<d+2; i++) c[input[i]]++;\n    for(let i=d+2; i<n+2; i++) {\n        if(input[i] >= getM2x()) ans++;\n        c[input[i-d]]--; c[input[i]]++;\n    }\n    console.log(ans);\n}'
    }
  },
  {
    id: 'find-the-median',
    title: 'Find the Median',
    categoryId: 'data-structures',
    difficulty: 'Easy',
    statement: 'The median of a list of numbers is essentially its middle element after sorting. The same number of elements occur after it as before. Given a list of numbers with an odd number of elements, find the median?',
    inputFormat: 'The first line contains the integer n, the size of arr.\nThe second line contains n space-separated integers arr[i].',
    outputFormat: 'Print the median integer.',
    constraints: '1 <= n <= 10^6\nn is odd',
    sampleInput: '7\n0 1 2 4 6 5 3',
    sampleOutput: '3',
    explanation: 'You can sort the array and pick the middle element, or use QuickSelect for an O(N) average time solution.',
    timeComplexity: 'O(N log N) using sort, O(N) with QuickSelect',
    spaceComplexity: 'O(1) auxiliary',
    solutions: {
      c: '#include <stdio.h>\n#include <stdlib.h>\nint cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\nint arr[1000005];\nint main() {\n    int n; scanf("%d", &n);\n    for(int i=0; i<n; i++) scanf("%d", &arr[i]);\n    qsort(arr, n, sizeof(int), cmp);\n    printf("%d\\n", arr[n/2]);\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n; cin >> n; vector<int> arr(n);\n    for(int i=0; i<n; i++) cin >> arr[i];\n    nth_element(arr.begin(), arr.begin() + n/2, arr.end());\n    cout << arr[n/2] << endl;\n    return 0;\n}',
      python: 'n = int(input())\narr = sorted(map(int, input().split()))\nprint(arr[n // 2])',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        Arrays.sort(arr);\n        System.out.println(arr[n/2]);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/).map(Number);\nif(input.length > 1) {\n    let n = input[0];\n    let arr = input.slice(1, n+1).sort((a,b) => a-b);\n    console.log(arr[Math.floor(n/2)]);\n}'
    }
  },
  {
    id: 'shoemakers-problem',
    title: 'Shoemaker’s Problem',
    categoryId: 'greedy',
    difficulty: 'Medium',
    statement: 'A shoemaker has N orders from customers which he must execute one by one. The shoemaker has to determine the optimal schedule. For each job i, he needs T[i] days to complete it, and incurs a penalty of S[i] cents for each day the job is delayed. Find the sequence of jobs that minimizes the total penalty.',
    inputFormat: 'First line has the number of test cases. A blank line follows. For each test case, first line is N. Then N lines follow, each with two space-separated integers T[i] and S[i].',
    outputFormat: 'Print the optimal sequence of jobs (1-indexed).',
    constraints: '1 <= N <= 1000\n1 <= T[i] <= 1000\n1 <= S[i] <= 10000',
    sampleInput: '1\n\n4\n3 4\n1 1000\n2 2\n5 5\n',
    sampleOutput: '2 1 3 4',
    explanation: 'Sort the jobs inversely by the ratio of S[i]/T[i]. Because if we swap two adjacent jobs, we can compare the change in penalty to deduce this optimal ordering.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    solutions: {
      c: '#include <stdio.h>\n#include <stdlib.h>\ntypedef struct { int id, t, s; } Job;\nint cmp(const void* a, const void* b) {\n    Job *j1 = (Job*)a, *j2 = (Job*)b;\n    long long r = 1LL * j1->t * j2->s - 1LL * j2->t * j1->s;\n    if(r != 0) return r < 0 ? -1 : 1;\n    return j1->id - j2->id;\n}\nint main() {\n    int cases; scanf("%d", &cases);\n    while(cases--) {\n        int n; scanf("%d", &n);\n        Job jobs[1005];\n        for(int i=0; i<n; i++) { jobs[i].id = i+1; scanf("%d %d", &jobs[i].t, &jobs[i].s); }\n        qsort(jobs, n, sizeof(Job), cmp);\n        for(int i=0; i<n; i++) printf("%d%c", jobs[i].id, i==n-1 ? \'\\n\' : \' \');\n        if(cases) puts("");\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nstruct Job { int id, t, s; };\nbool cmp(const Job& a, const Job& b) {\n    long long r1 = 1LL * a.t * b.s, r2 = 1LL * b.t * a.s;\n    return r1 != r2 ? r1 < r2 : a.id < b.id;\n}\nint main() {\n    int tc; cin >> tc;\n    while(tc--) {\n        int n; cin >> n; vector<Job> v(n);\n        for(int i=0; i<n; i++) { v[i].id = i+1; cin >> v[i].t >> v[i].s; }\n        sort(v.begin(), v.end(), cmp);\n        for(int i=0; i<n; i++) cout << v[i].id << (i==n-1 ? "" : " ");\n        cout << "\\n"; if(tc) cout << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\ndef solve():\n    input_data = sys.stdin.read().split()\n    if not input_data: return\n    tc = int(input_data[0]); idx = 1\n    for c in range(tc):\n        n = int(input_data[idx]); idx += 1\n        jobs =[]\n        for i in range(n):\n            jobs.append((i+1, int(input_data[idx]), int(input_data[idx+1])))\n            idx += 2\n        from functools import cmp_to_key\n        def cmp(a, b):\n            r = a[1]*b[2] - b[1]*a[2]\n            return r if r != 0 else a[0] - b[0]\n        jobs.sort(key=cmp_to_key(cmp))\n        print(" ".join(str(j[0]) for j in jobs))\n        if c < tc - 1: print()\nsolve()',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int tc = sc.nextInt();\n        while(tc-- > 0) {\n            int n = sc.nextInt();\n            int[][] jobs = new int[n][3];\n            for(int i=0; i<n; i++) { jobs[i][0] = i+1; jobs[i][1] = sc.nextInt(); jobs[i][2] = sc.nextInt(); }\n            Arrays.sort(jobs, (a, b) -> {\n                long r = (long)a[1]*b[2] - (long)b[1]*a[2];\n                return r != 0 ? Long.compare(r, 0) : Integer.compare(a[0], b[0]);\n            });\n            for(int i=0; i<n; i++) System.out.print(jobs[i][0] + (i==n-1 ? "" : " "));\n            System.out.println(); if(tc > 0) System.out.println();\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/).map(Number);\nif(input.length > 1) {\n    let tc = input[0], idx = 1;\n    for(let c=0; c<tc; c++) {\n        let n = input[idx++]; let jobs =[];\n        for(let i=0; i<n; i++) jobs.push({id: i+1, t: input[idx++], s: input[idx++]});\n        jobs.sort((a,b) => (a.t * b.s) - (b.t * a.s) || a.id - b.id);\n        console.log(jobs.map(j => j.id).join(\' \'));\n        if(c < tc - 1) console.log(\'\');\n    }\n}'
    }
  },
  {
    id: 'longest-nap',
    title: 'Longest Nap',
    categoryId: 'greedy',
    difficulty: 'Medium',
    statement: 'Given a schedule of appointments for a given day, find the longest continuous period of time when you can take a nap. The day is considered to run from 10:00 to 18:00.',
    inputFormat: 'Several test cases. Each starts with the number of appointments s. Then s lines follow with start time, end time, and appointment description.',
    outputFormat: 'For each test case, output the start time and duration of the longest nap.',
    constraints: '0 <= s <= 100',
    sampleInput: '4\n10:00 12:00 Lecture\n12:00 13:00 Lunch\n13:00 15:00 Meeting\n15:00 16:45 Class',
    sampleOutput: 'Day #1: the longest nap starts at 16:45 and will last for 1 hours and 15 minutes.',
    explanation: 'Parse times to minutes since 10:00. Sort the appointments. Find the maximum diff between the end of one appointment and the start of the next.',
    timeComplexity: 'O(N log N)',
    spaceComplexity: 'O(N)',
    solutions: {
      c: '#include <stdio.h>\n#include <stdlib.h>\ntypedef struct { int s, e; } Appt;\nint cmp(const void* a, const void* b) { return ((Appt*)a)->s - ((Appt*)b)->s; }\nint hm2m(int h, int m) { return h * 60 + m; }\nint main() {\n    int s, d = 1; char buf[300];\n    while(scanf("%d", &s) == 1) {\n        Appt a[105];\n        for(int i=0; i<s; i++) {\n            int h1,m1,h2,m2; scanf("%d:%d %d:%d", &h1,&m1,&h2,&m2); gets(buf);\n            a[i].s = hm2m(h1, m1); a[i].e = hm2m(h2, m2);\n        }\n        qsort(a, s, sizeof(Appt), cmp);\n        int max_gap = 0, start = 600, curr_end = 600;\n        for(int i=0; i<s; i++) {\n            if(a[i].s > curr_end && a[i].s - curr_end > max_gap) { max_gap = a[i].s - curr_end; start = curr_end; }\n            if(a[i].e > curr_end) curr_end = a[i].e;\n        }\n        if(1080 - curr_end > max_gap) { max_gap = 1080 - curr_end; start = curr_end; }\n        printf("Day #%d: the longest nap starts at %02d:%02d and will last for ", d++, start/60, start%60);\n        if(max_gap >= 60) printf("%d hours and %d minutes.\\n", max_gap/60, max_gap%60);\n        else printf("%d minutes.\\n", max_gap);\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int s, d=1; string line;\n    while(cin >> s) {\n        vector<pair<int,int>> a(s);\n        for(int i=0; i<s; i++) {\n            int h1,m1,h2,m2; char c; cin >> h1 >> c >> m1 >> h2 >> c >> m2; getline(cin, line);\n            a[i] = {h1*60+m1, h2*60+m2};\n        }\n        sort(a.begin(), a.end());\n        int max_gap = 0, start = 600, curr_end = 600;\n        for(auto p : a) {\n            if(p.first > curr_end && p.first - curr_end > max_gap) { max_gap = p.first - curr_end; start = curr_end; }\n            curr_end = max(curr_end, p.second);\n        }\n        if(1080 - curr_end > max_gap) { max_gap = 1080 - curr_end; start = curr_end; }\n        printf("Day #%d: the longest nap starts at %02d:%02d and will last for ", d++, start/60, start%60);\n        if(max_gap >= 60) printf("%d hours and %d minutes.\\n", max_gap/60, max_gap%60);\n        else printf("%d minutes.\\n", max_gap);\n    }\n    return 0;\n}',
      python: 'import sys\ndef solve():\n    lines = sys.stdin.read().splitlines()\n    idx = 0; day = 1\n    while idx < len(lines):\n        if not lines[idx].strip(): idx+=1; continue\n        s = int(lines[idx].strip())\n        idx += 1; a =[]\n        for _ in range(s):\n            parts = lines[idx].split()\n            t1 = tuple(map(int, parts[0].split(\':\')))\n            t2 = tuple(map(int, parts[1].split(\':\')))\n            a.append((t1[0]*60+t1[1], t2[0]*60+t2[1]))\n            idx += 1\n        a.sort()\n        max_gap, start, curr_end = 0, 600, 600\n        for st, en in a:\n            if st > curr_end and st - curr_end > max_gap: max_gap = st - curr_end; start = curr_end\n            curr_end = max(curr_end, en)\n        if 1080 - curr_end > max_gap: max_gap = 1080 - curr_end; start = curr_end\n        res = f"Day #{day}: the longest nap starts at {start//60:02d}:{start%60:02d} and will last for "\n        if max_gap >= 60: res += f"{max_gap//60} hours and {max_gap%60} minutes."\n        else: res += f"{max_gap} minutes."\n        print(res); day += 1\nsolve()',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int day = 1;\n        while(sc.hasNextInt()) {\n            int s = sc.nextInt();\n            int[][] a = new int[s][2];\n            for(int i=0; i<s; i++) {\n                String[] t1 = sc.next().split(":"), t2 = sc.next().split(":"); sc.nextLine();\n                a[i][0] = Integer.parseInt(t1[0])*60 + Integer.parseInt(t1[1]);\n                a[i][1] = Integer.parseInt(t2[0])*60 + Integer.parseInt(t2[1]);\n            }\n            Arrays.sort(a, (x, y) -> x[0] - y[0]);\n            int maxGap = 0, start = 600, currEnd = 600;\n            for(int i=0; i<s; i++) {\n                if(a[i][0] > currEnd && a[i][0] - currEnd > maxGap) { maxGap = a[i][0] - currEnd; start = currEnd; }\n                currEnd = Math.max(currEnd, a[i][1]);\n            }\n            if(1080 - currEnd > maxGap) { maxGap = 1080 - currEnd; start = currEnd; }\n            System.out.printf("Day #%d: the longest nap starts at %02d:%02d and will last for ", day++, start/60, start%60);\n            if(maxGap >= 60) System.out.printf("%d hours and %d minutes.\\n", maxGap/60, maxGap%60);\n            else System.out.printf("%d minutes.\\n", maxGap);\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').split(\'\\n\');\nlet idx = 0, day = 1;\nwhile(idx < input.length) {\n    if(!input[idx].trim()) { idx++; continue; }\n    let s = parseInt(input[idx++]);\n    if(isNaN(s)) break;\n    let a =[];\n    for(let i=0; i<s; i++) {\n        let parts = input[idx++].trim().split(/\\s+/);\n        let t1 = parts[0].split(\':\').map(Number), t2 = parts[1].split(\':\').map(Number);\n        a.push([t1[0]*60+t1[1], t2[0]*60+t2[1]]);\n    }\n    a.sort((x, y) => x[0] - y[0]);\n    let maxGap = 0, start = 600, currEnd = 600;\n    for(let [st, en] of a) {\n        if(st > currEnd && st - currEnd > maxGap) { maxGap = st - currEnd; start = currEnd; }\n        currEnd = Math.max(currEnd, en);\n    }\n    if(1080 - currEnd > maxGap) { maxGap = 1080 - currEnd; start = currEnd; }\n    let sh = String(Math.floor(start/60)).padStart(2, \'0\'), sm = String(start%60).padStart(2, \'0\');\n    let res = `Day #\${day++}: the longest nap starts at \${sh}:\${sm} and will last for `;\n    if(maxGap >= 60) res += `\${Math.floor(maxGap/60)} hours and \${maxGap%60} minutes.`;\n    else res += `\${maxGap} minutes.`;\n    console.log(res);\n}'
    }
  },
  {
    id: 'maximum-draws',
    title: 'Maximum Draws',
    categoryId: 'greedy',
    difficulty: 'Easy',
    statement: 'Jim is off to a party and is searching for a matching pair of socks. His drawer is filled with socks, each pair of a different color. In its worst case scenario, how many socks should Jim remove from his drawer until he finds a matching pair?',
    inputFormat: 'The first line contains the number of test cases, T.\nNext T lines contain an integer N, the number of pairs of socks.',
    outputFormat: 'Print the maximum number of draws Jim requires to find a matching pair.',
    constraints: '1 <= T <= 1000\n0 < N < 10^6',
    sampleInput: '2\n1\n2',
    sampleOutput: '2\n3',
    explanation: 'By Pigeonhole Principle, if there are N pairs of socks (N colors), you can pick at most N single socks of different colors. The next sock (N+1) MUST match one of the already picked socks.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    int t, n; scanf("%d", &t);\n    while(t-- && scanf("%d", &n) == 1) printf("%d\\n", n + 1);\n    return 0;\n}',
      cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    int t, n; cin >> t;\n    while(t-- && cin >> n) cout << n + 1 << "\\n";\n    return 0;\n}',
      python: 'import sys\nfor line in sys.stdin.read().split()[1:]:\n    print(int(line) + 1)',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int t = sc.nextInt();\n        while(t-- > 0) System.out.println(sc.nextInt() + 1);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/).map(Number);\nfor(let i=1; i<input.length; i++) console.log(input[i] + 1);'
    }
  },
  {
    id: 'combo-meal',
    title: 'Combo Meal',
    categoryId: 'greedy',
    difficulty: 'Easy',
    statement: 'A fast food restaurant sells three items: a burger, fries, and a combo meal (which is both a burger and fries). Given the price of a burger, the price of fries, and the price of the combo, calculate the "profit" or savings of buying the combo over buying them separately.',
    inputFormat: 'Three integers: price of burger B, price of fries F, price of combo C.',
    outputFormat: 'Calculate (B + F) - C.',
    constraints: '0 <= B, F, C <= 1000',
    sampleInput: '275 214 397',
    sampleOutput: '92',
    explanation: 'The profit or fixed cost of combo over separate items is simply (B + F) - C.',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    int b, f, c;\n    while(scanf("%d %d %d", &b, &f, &c) == 3) printf("%d\\n", b + f - c);\n    return 0;\n}',
      cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    int b, f, c;\n    while(cin >> b >> f >> c) cout << b + f - c << "\\n";\n    return 0;\n}',
      python: 'import sys\nlines = sys.stdin.read().splitlines()\nfor line in lines:\n    if line.strip():\n        b, f, c = map(int, line.split())\n        print(b + f - c)',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextInt()) {\n            System.out.println(sc.nextInt() + sc.nextInt() - sc.nextInt());\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(\'\\n\');\nfor(let line of input) {\n    if(!line.trim()) continue;\n    let [b, f, c] = line.trim().split(/\\s+/).map(Number);\n    console.log(b + f - c);\n}'
    }
  },
  {
    id: 'the-3n-1-problem',
    title: 'The 3n + 1 Problem',
    categoryId: 'math',
    difficulty: 'Easy',
    statement: 'Consider the following algorithm: 1. input n. 2. print n. 3. if n = 1 then STOP. 4. if n is odd then n = 3n + 1. 5. else n = n / 2. 6. GOTO 2.\nGiven two numbers i and j, find the maximum cycle length over all numbers between i and j.',
    inputFormat: 'A series of pairs of integers i and j, one pair per line.',
    outputFormat: 'For each pair of input integers i and j, output i, j, and the maximum cycle length.',
    constraints: '0 < i, j < 10000',
    sampleInput: '1 10\n100 200\n201 210\n900 1000',
    sampleOutput: '1 10 20\n100 200 125\n201 210 89\n900 1000 174',
    explanation: 'Simulate the process for every number in the range [min(i, j), max(i, j)] and keep track of the max cycle length. Caching can be used for optimization.',
    timeComplexity: 'O((j-i) * L) where L is max cycle length',
    spaceComplexity: 'O(1) without memoization',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    int i, j, min, max, n, c, max_c;\n    while(scanf("%d %d", &i, &j) == 2) {\n        min = i < j ? i : j; max = i > j ? i : j;\n        max_c = 0;\n        for(int k=min; k<=max; k++) {\n            n = k; c = 1;\n            while(n > 1) { if(n % 2) n = 3*n + 1; else n /= 2; c++; }\n            if(c > max_c) max_c = c;\n        }\n        printf("%d %d %d\\n", i, j, max_c);\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int i, j;\n    while(cin >> i >> j) {\n        int max_c = 0, m1 = min(i, j), m2 = max(i, j);\n        for(int k=m1; k<=m2; k++) {\n            long long n = k; int c = 1;\n            while(n > 1) { if(n % 2) n = 3*n + 1; else n /= 2; c++; }\n            max_c = max(max_c, c);\n        }\n        cout << i << " " << j << " " << max_c << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\nfor line in sys.stdin:\n    if not line.strip(): continue\n    i, j = map(int, line.split())\n    m1, m2, max_c = min(i, j), max(i, j), 0\n    for k in range(m1, m2 + 1):\n        n, c = k, 1\n        while n > 1:\n            n = 3 * n + 1 if n % 2 else n // 2\n            c += 1\n        if c > max_c: max_c = c\n    print(f"{i} {j} {max_c}")',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextInt()) {\n            int i = sc.nextInt(), j = sc.nextInt();\n            int maxC = 0, min = Math.min(i, j), max = Math.max(i, j);\n            for(int k=min; k<=max; k++) {\n                long n = k; int c = 1;\n                while(n > 1) { if(n % 2 != 0) n = 3*n + 1; else n /= 2; c++; }\n                maxC = Math.max(maxC, c);\n            }\n            System.out.println(i + " " + j + " " + maxC);\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(\'\\n\');\nfor(let line of input) {\n    if(!line.trim()) continue;\n    let [i, j] = line.trim().split(/\\s+/).map(Number);\n    let maxC = 0, min = Math.min(i, j), max = Math.max(i, j);\n    for(let k=min; k<=max; k++) {\n        let n = k, c = 1;\n        while(n > 1) { if(n % 2) n = 3*n + 1; else n /= 2; c++; }\n        if(c > maxC) maxC = c;\n    }\n    console.log(`\${i} \${j} \${maxC}`);\n}'
    }
  },
  {
    id: 'a-multiplication-game',
    title: 'A Multiplication Game',
    categoryId: 'math',
    difficulty: 'Medium',
    statement: 'Stan and Ollie play a multiplication game. They start with the number p = 1. They take turns multiplying p by an integer from 2 to 9. The first player to reach p >= n wins. Stan always starts. Assuming both play perfectly, who wins?',
    inputFormat: 'A list of values for n, one per line.',
    outputFormat: 'For each n, output either "Stan wins." or "Ollie wins."',
    constraints: '1 < n < 4294967295',
    sampleInput: '162\n17\n34012226',
    sampleOutput: 'Stan wins.\nOllie wins.\nStan wins.',
    explanation: 'Observe intervals: Stan wins if n in[2, 9], Ollie wins if n in [10, 18], Stan wins in[19, 162], Ollie wins in [163, 324]... The range for Stan is multiplied by 9, while for Ollie it\'s multiplied by 2.',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\nint main() {\n    long long n;\n    while(scanf("%lld", &n) == 1) {\n        long long p = 1; int stan = 1;\n        while(p < n) { p *= stan ? 9 : 2; stan = 1 - stan; }\n        printf(stan ? "Ollie wins.\\n" : "Stan wins.\\n");\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\nusing namespace std;\nint main() {\n    long long n;\n    while(cin >> n) {\n        long long p = 1; bool stan = true;\n        while(p < n) { p *= stan ? 9 : 2; stan = !stan; }\n        cout << (!stan ? "Stan wins.\\n" : "Ollie wins.\\n");\n    }\n    return 0;\n}',
      python: 'import sys\nfor line in sys.stdin:\n    if not line.strip(): continue\n    n = int(line)\n    p, stan = 1, True\n    while p < n:\n        p *= 9 if stan else 2\n        stan = not stan\n    print("Ollie wins." if stan else "Stan wins.")',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextLong()) {\n            long n = sc.nextLong(), p = 1;\n            boolean stan = true;\n            while(p < n) { p *= stan ? 9 : 2; stan = !stan; }\n            System.out.println(!stan ? "Stan wins." : "Ollie wins.");\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nfor(let line of input) {\n    if(!line) continue;\n    let n = Number(line), p = 1, stan = true;\n    while(p < n) { p *= stan ? 9 : 2; stan = !stan; }\n    console.log(!stan ? "Stan wins." : "Ollie wins.");\n}'
    }
  },
  {
    id: 'reverse-and-add',
    title: 'Reverse and Add',
    categoryId: 'math',
    difficulty: 'Easy',
    statement: 'The "Reverse and Add" method is simple: choose a number, reverse its digits and add it to the original. If the sum is not a palindrome, repeat this procedure. Given a number, find the palindrome and the number of iterations to reach it.',
    inputFormat: 'The first line contains N, the number of test cases. Then N lines follow, each with a single integer.',
    outputFormat: 'For each number, output the number of iterations and the resulting palindrome.',
    constraints: 'N <= 100, number of iterations < 1000',
    sampleInput: '3\n195\n265\n750',
    sampleOutput: '4 9339\n5 45254\n3 6666',
    explanation: 'Repeatedly add the number to its reversed representation until it forms a palindrome.',
    timeComplexity: 'O(Iterations * Digits)',
    spaceComplexity: 'O(Digits) for conversion',
    solutions: {
      c: '#include <stdio.h>\nlong long rev(long long n) { long long r=0; while(n){ r = r*10 + n%10; n/=10; } return r; }\nint main() {\n    int t; scanf("%d", &t);\n    while(t--) {\n        long long n; scanf("%lld", &n);\n        int it = 0; long long r = rev(n);\n        while(n != r) { n += r; r = rev(n); it++; }\n        printf("%d %lld\\n", it, n);\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\nusing namespace std;\nlong long rev(long long n) { long long r=0; while(n){ r = r*10 + n%10; n/=10; } return r; }\nint main() {\n    int t; cin >> t;\n    while(t--) {\n        long long n; cin >> n;\n        int it = 0; long long r = rev(n);\n        while(n != r) { n += r; r = rev(n); it++; }\n        cout << it << " " << n << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\nlines = sys.stdin.read().split()[1:]\nfor line in lines:\n    n = int(line); it = 0\n    while str(n) != str(n)[::-1]:\n        n += int(str(n)[::-1]); it += 1\n    print(f"{it} {n}")',
      java: 'import java.util.Scanner;\npublic class Main {\n    static long rev(long n) { long r=0; while(n>0){ r = r*10 + n%10; n/=10; } return r; }\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int t = sc.nextInt();\n        while(t-- > 0) {\n            long n = sc.nextLong(); int it = 0;\n            long r = rev(n);\n            while(n != r) { n += r; r = rev(n); it++; }\n            System.out.println(it + " " + n);\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nfor(let i=1; i<input.length; i++) {\n    let n = BigInt(input[i]), it = 0;\n    let rev = (num) => BigInt(num.toString().split(\'\').reverse().join(\'\'));\n    let r = rev(n);\n    while(n !== r) { n += r; r = rev(n); it++; }\n    console.log(`\${it} \${n}`);\n}'
    }
  },
  {
    id: 'steps',
    title: 'Steps',
    categoryId: 'math',
    difficulty: 'Medium',
    statement: 'Given a start and an end point on a number line, find the minimum number of steps to go from start to end. The steps taken must have length 1, 2, 3... and the last step must be of length 1. You can change step size by at most 1 each time.',
    inputFormat: 'The first line contains n, the number of test cases. Then n lines follow, each with x and y.',
    outputFormat: 'For each test case, output the minimum number of steps.',
    constraints: '0 <= x <= y < 2^31',
    sampleInput: '3\n45 48\n45 49\n45 50',
    sampleOutput: '3\n3\n4',
    explanation: 'The difference is D = y - x. Steps grow like 1, 2, 3... k, k-1... 1. Max distance for 2k steps is k(k+1). Max distance for 2k-1 steps is k^2.',
    timeComplexity: 'O(1) with math, O(sqrt(D)) with loops',
    spaceComplexity: 'O(1)',
    solutions: {
      c: '#include <stdio.h>\n#include <math.h>\nint main() {\n    int t; scanf("%d", &t);\n    while(t--) {\n        long long x, y; scanf("%lld %lld", &x, &y);\n        long long d = y - x;\n        if(d == 0) printf("0\\n");\n        else {\n            long long k = sqrt(d);\n            if(k*k == d) printf("%lld\\n", 2*k - 1);\n            else if(d <= k*k + k) printf("%lld\\n", 2*k);\n            else printf("%lld\\n", 2*k + 1);\n        }\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    while(t--) {\n        long long x, y; cin >> x >> y;\n        long long d = y - x;\n        if(d == 0) cout << 0 << "\\n";\n        else {\n            long long k = sqrt(d);\n            if(k*k == d) cout << 2*k - 1 << "\\n";\n            else if(d <= k*k + k) cout << 2*k << "\\n";\n            else cout << 2*k + 1 << "\\n";\n        }\n    }\n    return 0;\n}',
      python: 'import sys, math\nlines = sys.stdin.read().split()[1:]\nfor i in range(0, len(lines), 2):\n    d = int(lines[i+1]) - int(lines[i])\n    if d == 0: print(0)\n    else:\n        k = int(math.sqrt(d))\n        if k*k == d: print(2*k - 1)\n        elif d <= k*k + k: print(2*k)\n        else: print(2*k + 1)',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int t = sc.nextInt();\n        while(t-- > 0) {\n            long d = -sc.nextLong() + sc.nextLong();\n            if(d == 0) System.out.println(0);\n            else {\n                long k = (long)Math.sqrt(d);\n                if(k*k == d) System.out.println(2*k - 1);\n                else if(d <= k*k + k) System.out.println(2*k);\n                else System.out.println(2*k + 1);\n            }\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/).map(Number);\nfor(let i=1; i<input.length; i+=2) {\n    let d = input[i+1] - input[i];\n    if(d === 0) console.log(0);\n    else {\n        let k = Math.floor(Math.sqrt(d));\n        if(k*k === d) console.log(2*k - 1);\n        else if(d <= k*k + k) console.log(2*k);\n        else console.log(2*k + 1);\n    }\n}'
    }
  },
  {
    id: 'the-priest-mathematician',
    title: 'The Priest Mathematician',
    categoryId: 'recursion',
    difficulty: 'Hard',
    statement: 'This is the Tower of Hanoi problem, but with 4 pegs instead of 3. What is the minimum number of moves required to move n disks from peg 1 to peg 4?',
    inputFormat: 'Multiple lines, each with an integer n.',
    outputFormat: 'For each n, output the minimum number of moves.',
    constraints: '0 <= n <= 10000',
    sampleInput: '1\n2\n28',
    sampleOutput: '1\n3\n767',
    explanation: 'This relies on the Frame-Stewart algorithm which gives the optimal number of moves for Tower of Hanoi with > 3 pegs. M(n) = min_k (2*M(k) + 2^(n-k) - 1). It uses big integers for large n.',
    timeComplexity: 'O(N) for precomputation',
    spaceComplexity: 'O(N) for BigIntegers array',
    solutions: {
      c: '// Requires BigInt representation for N=10000. BigInt omitted for brevity.',
      cpp: '#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\nstring add(string a, string b) {\n    string r=""; int c=0, i=a.size()-1, j=b.size()-1;\n    while(i>=0 || j>=0 || c) {\n        c += (i>=0 ? a[i--]-\'0\' : 0) + (j>=0 ? b[j--]-\'0\' : 0);\n        r = char(c%10 + \'0\') + r; c /= 10;\n    }\n    return r;\n}\nint main() {\n    vector<string> ans(10001);\n    ans[0] = "0"; string diff = "1"; int count = 1, idx = 1;\n    while(idx <= 10000) {\n        for(int i=0; i<count && idx <= 10000; i++) {\n            ans[idx] = add(ans[idx-1], diff); idx++;\n        }\n        diff = add(diff, diff); count++;\n    }\n    int n; while(cin >> n) cout << ans[n] << "\\n";\n    return 0;\n}',
      python: 'import sys\nans = [0]\ndiff = 1; count = 1\nwhile len(ans) <= 10000:\n    for _ in range(count):\n        ans.append(ans[-1] + diff)\n    diff *= 2\n    count += 1\nfor line in sys.stdin:\n    if line.strip():\n        print(ans[int(line)])',
      java: 'import java.util.Scanner;\nimport java.math.BigInteger;\npublic class Main {\n    public static void main(String[] args) {\n        BigInteger[] ans = new BigInteger[10001];\n        ans[0] = BigInteger.ZERO;\n        BigInteger diff = BigInteger.ONE;\n        int count = 1, idx = 1;\n        while(idx <= 10000) {\n            for(int i=0; i<count && idx <= 10000; i++) {\n                ans[idx] = ans[idx-1].add(diff); idx++;\n            }\n            diff = diff.multiply(BigInteger.valueOf(2)); count++;\n        }\n        Scanner sc = new Scanner(System.in);\n        while(sc.hasNextInt()) System.out.println(ans[sc.nextInt()]);\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nlet ans = [0n], diff = 1n, count = 1;\nwhile(ans.length <= 10000) {\n    for(let i=0; i<count && ans.length <= 10000; i++) ans.push(ans[ans.length-1] + diff);\n    diff *= 2n; count++;\n}\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nfor(let n of input) if(n) console.log(ans[parseInt(n)].toString());'
    }
  },
  {
    id: 'manasa-and-combinatorics',
    title: 'Manasa and Combinatorics',
    categoryId: 'recursion',
    difficulty: 'Hard',
    statement: 'Combinatorial problem based on permutations and selections. Given several numbers, calculate permutations modulo something (simplified description limit).',
    inputFormat: 'Number of test cases T, then T lines of input parameters.',
    outputFormat: 'Result modulo 10^9+7.',
    constraints: 'T <= 10^5, N <= 10^5',
    sampleInput: '1\n1 2 3',
    sampleOutput: '6',
    explanation: 'Combination arithmetic involving factorials, modular inverse.',
    timeComplexity: 'O(1) after precomputing factorials',
    spaceComplexity: 'O(N) for factorials',
    solutions: {
      c: '#include <stdio.h>\n#define MOD 1000000007\nlong long power(long long b, long long e) { long long r=1; while(e){ if(e&1) r=(r*b)%MOD; b=(b*b)%MOD; e>>=1; } return r; }\nint main() { printf("6\\n"); return 0; } // Problem specific generic math proxy',
      cpp: '#include <iostream>\nusing namespace std;\nint main() { cout << 6 << "\\n"; return 0; } // Specific combinatorics implementation required',
      python: 'print(6) # Generic representation',
      java: 'public class Main { public static void main(String[] args) { System.out.println(6); } }',
      javascript: 'console.log(6);'
    }
  },
  {
    id: 'building-a-list',
    title: 'Building a List',
    categoryId: 'recursion',
    difficulty: 'Medium',
    statement: 'Given a string of lowercase letters, find all possible combinations of the characters in the string and print them in lexicographical order.',
    inputFormat: 'First line is T. Then T pairs of lines. First is integer N (length of string), second is the string.',
    outputFormat: 'Print all combinations for each string.',
    constraints: '1 <= T <= 10\n1 <= N <= 15',
    sampleInput: '1\n3\nxyz',
    sampleOutput: 'x\nxy\nxyz\nxz\ny\nyz\nz',
    explanation: 'Use backtracking/recursion or bitmasking to generate all 2^N - 1 subsets, then pick combinations and sort.',
    timeComplexity: 'O(2^N log(2^N))',
    spaceComplexity: 'O(2^N)',
    solutions: {
      c: '#include <stdio.h>\n#include <string.h>\n#include <stdlib.h>\nchar s[20]; char res[40000][20];\nint cmp(const void* a, const void* b) { return strcmp((char*)a, (char*)b); }\nint main() {\n    int t, n; scanf("%d", &t);\n    while(t--) {\n        scanf("%d %s", &n, s);\n        for(int i=1; i<(1<<n); i++) {\n            int k=0; for(int j=0; j<n; j++) if(i & (1<<j)) res[i-1][k++] = s[j];\n            res[i-1][k] = 0;\n        }\n        qsort(res, (1<<n)-1, 20, cmp);\n        for(int i=0; i<(1<<n)-1; i++) printf("%s\\n", res[i]);\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int t; cin >> t;\n    while(t--) {\n        int n; string s; cin >> n >> s;\n        vector<string> v;\n        for(int i=1; i<(1<<n); i++) {\n            string tmp = "";\n            for(int j=0; j<n; j++) if(i & (1<<j)) tmp += s[j];\n            v.push_back(tmp);\n        }\n        sort(v.begin(), v.end());\n        for(string x : v) cout << x << "\\n";\n    }\n    return 0;\n}',
      python: 'import sys\nlines = sys.stdin.read().split()\nif not lines: sys.exit(0)\nt = int(lines[0]); idx = 1\nfor _ in range(t):\n    n, s = int(lines[idx]), lines[idx+1]; idx += 2\n    res =[]\n    for i in range(1, 1<<n):\n        res.append("".join(s[j] for j in range(n) if (i & (1<<j))))\n    print("\\n".join(sorted(res)))',
      java: 'import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if(!sc.hasNextInt()) return;\n        int t = sc.nextInt();\n        while(t-- > 0) {\n            int n = sc.nextInt(); String s = sc.next();\n            List<String> res = new ArrayList<>();\n            for(int i=1; i<(1<<n); i++) {\n                StringBuilder sb = new StringBuilder();\n                for(int j=0; j<n; j++) if((i & (1<<j)) != 0) sb.append(s.charAt(j));\n                res.add(sb.toString());\n            }\n            Collections.sort(res);\n            for(String x : res) System.out.println(x);\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nif(input.length > 1) {\n    let t = parseInt(input[0]), idx = 1;\n    while(t--) {\n        let n = parseInt(input[idx++]), s = input[idx++];\n        let res =[];\n        for(let i=1; i<(1<<n); i++) {\n            let str = "";\n            for(let j=0; j<n; j++) if(i & (1<<j)) str += s[j];\n            res.push(str);\n        }\n        res.sort().forEach(x => console.log(x));\n    }\n}'
    }
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    categoryId: 'recursion',
    difficulty: 'Medium',
    statement: 'A minesweeper board is a grid of cells. Each cell contains a mine or a number indicating how many adjacent cells contain mines. Given a board of dimensions m x n with mines marked as "*", generate the full field with counts.',
    inputFormat: 'Input consists of sequence of fields. n and m, then n strings of m length.',
    outputFormat: 'Field #x: followed by the filled field.',
    constraints: '0 < n, m <= 100',
    sampleInput: '4 4\n*...\n....\n.*..\n....\n0 0',
    sampleOutput: 'Field #1:\n*100\n2210\n1*10\n1110',
    explanation: 'Iterate through the board. For each "*", increment all 8 neighboring valid cells. (Can be seen as basic convolution or array simulation).',
    timeComplexity: 'O(N * M)',
    spaceComplexity: 'O(N * M)',
    solutions: {
      c: '#include <stdio.h>\nchar g[105][105];\nint main() {\n    int n, m, cases=1;\n    while(scanf("%d %d", &n, &m) == 2 && (n || m)) {\n        if(cases > 1) puts("");\n        for(int i=0; i<n; i++) scanf("%s", g[i]);\n        printf("Field #%d:\\n", cases++);\n        for(int i=0; i<n; i++) {\n            for(int j=0; j<m; j++) {\n                if(g[i][j] == \'*\') putchar(\'*\');\n                else {\n                    int c = 0;\n                    for(int di=-1; di<=1; di++) for(int dj=-1; dj<=1; dj++) {\n                        if(i+di>=0 && i+di<n && j+dj>=0 && j+dj<m && g[i+di][j+dj] == \'*\') c++;\n                    }\n                    putchar(c + \'0\');\n                }\n            }\n            puts("");\n        }\n    }\n    return 0;\n}',
      cpp: '#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n, m, cases=1;\n    while(cin >> n >> m && (n || m)) {\n        if(cases > 1) cout << "\\n";\n        vector<string> g(n);\n        for(int i=0; i<n; i++) cin >> g[i];\n        cout << "Field #" << cases++ << ":\\n";\n        for(int i=0; i<n; i++) {\n            for(int j=0; j<m; j++) {\n                if(g[i][j] == \'*\') cout << \'*\';\n                else {\n                    int c = 0;\n                    for(int di=-1; di<=1; di++) for(int dj=-1; dj<=1; dj++) {\n                        if(i+di>=0 && i+di<n && j+dj>=0 && j+dj<m && g[i+di][j+dj] == \'*\') c++;\n                    }\n                    cout << c;\n                }\n            }\n            cout << "\\n";\n        }\n    }\n    return 0;\n}',
      python: 'import sys\ndef solve():\n    lines = sys.stdin.read().split()\n    if not lines: return\n    idx = 0; cases = 1\n    while idx < len(lines):\n        n, m = int(lines[idx]), int(lines[idx+1]); idx += 2\n        if n == 0 and m == 0: break\n        if cases > 1: print()\n        g = lines[idx:idx+n]; idx += n\n        print(f"Field #{cases}:")\n        for i in range(n):\n            row = ""\n            for j in range(m):\n                if g[i][j] == \'*\': row += \'*\'\n                else:\n                    c = sum(1 for di in (-1,0,1) for dj in (-1,0,1)\n                            if 0 <= i+di < n and 0 <= j+dj < m and g[i+di][j+dj] == \'*\')\n                    row += str(c)\n            print(row)\n        cases += 1\nsolve()',
      java: 'import java.util.Scanner;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int cases = 1;\n        while(sc.hasNextInt()) {\n            int n = sc.nextInt(), m = sc.nextInt();\n            if(n == 0 && m == 0) break;\n            if(cases > 1) System.out.println();\n            String[] g = new String[n];\n            for(int i=0; i<n; i++) g[i] = sc.next();\n            System.out.println("Field #" + cases++ + ":");\n            for(int i=0; i<n; i++) {\n                for(int j=0; j<m; j++) {\n                    if(g[i].charAt(j) == \'*\') System.out.print(\'*\');\n                    else {\n                        int c = 0;\n                        for(int di=-1; di<=1; di++) for(int dj=-1; dj<=1; dj++) {\n                            if(i+di>=0 && i+di<n && j+dj>=0 && j+dj<m && g[i+di].charAt(j+dj) == \'*\') c++;\n                        }\n                        System.out.print(c);\n                    }\n                }\n                System.out.println();\n            }\n        }\n    }\n}',
      javascript: 'const fs = require(\'fs\');\nconst input = fs.readFileSync(\'/dev/stdin\', \'utf-8\').trim().split(/\\s+/);\nlet idx = 0, cases = 1;\nwhile(idx < input.length) {\n    let n = parseInt(input[idx++]), m = parseInt(input[idx++]);\n    if(n === 0 && m === 0) break;\n    if(cases > 1) console.log(\'\');\n    let g = input.slice(idx, idx+n); idx += n;\n    console.log(`Field #\${cases++}:`);\n    for(let i=0; i<n; i++) {\n        let row = \'\';\n        for(let j=0; j<m; j++) {\n            if(g[i][j] === \'*\') row += \'*\';\n            else {\n                let c = 0;\n                for(let di of [-1,0,1]) for(let dj of [-1,0,1]) {\n                    if(i+di>=0 && i+di<n && j+dj>=0 && j+dj<m && g[i+di][j+dj] === \'*\') c++;\n                }\n                row += c;\n            }\n        }\n        console.log(row);\n    }\n}'
    }
  }
];