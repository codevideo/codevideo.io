import { Code, Link, Text } from '@radix-ui/themes';
import * as React from 'react';

export interface IStarOnGitHubProps {
    repoName: string;
    repoLink: string;
}

export function StarOnGitHub (props: IStarOnGitHubProps) {
    const { repoName, repoLink } = props;
  return (
    <Text>
      Star <Link href={repoLink}><Code>{repoName}</Code></Link> on GitHub!
    </Text>
  );
}
