import { Octokit } from "@octokit/rest";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useGitRepos() {

    const session = useSession()
    const [repos, setRepos] = useState<any[]>([])
    const [repos2, setRepos2] = useState<any[]>([])
    const [loading, setLoading] = useState<any>(true)
    
    useEffect(() => {
        const fetchRepos = async () => {
            let allRepos: React.SetStateAction<any[]> = [];
            let repoPage = 1;
            try {

                const octokit = new Octokit({
                    auth: session.data?.user.accessToken
                });

                while (true) {
                    const res = await octokit.request('GET /user/repos', {
                        per_page: 100,
                        sort: "pushed",
                        page: repoPage,
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        }
                    });

                    if (res.data.length === 0) {
                        break;
                    }

                    const simplifiedRepos = res.data.map(repo => ({
                        name: repo.name,
                        url: repo.html_url,
                        pushed_at: repo.pushed_at,
                    }));

                    allRepos = [...allRepos, ...simplifiedRepos];
                    repoPage += 1;
                }

                setRepos([...allRepos]);
                setRepos2([...allRepos]);
                setLoading(false);

            } catch (error) {
                console.log(error)
                setLoading("error");
            }
        };

        if (session.status == "authenticated") fetchRepos();
    }, [session.status])

    return { repos, repos2, loading, setRepos, setLoading }
}