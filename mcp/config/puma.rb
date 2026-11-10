# frozen_string_literal: true

# One process with threads: the server keeps no state between requests, and
# a request waits mostly on Typesense. Nothing is written to disk (no pid or
# state file), so the container runs with a read-only file system.
threads_count = Integer(ENV.fetch('PUMA_THREADS', 5))
threads threads_count, threads_count

bind "tcp://0.0.0.0:#{Integer(ENV.fetch('PORT', 9292))}"
environment ENV.fetch('RACK_ENV', 'production')
